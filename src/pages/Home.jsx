import AddVictims from "../components/AddVictims";
import ListContract from "../components/ListContract";
import {toast} from "react-toastify";
import {useWallet, useConnectedWallet, WalletStatus} from "@terra-money/wallet-provider";
import {truncate} from "../shared/Utils";
import {useEffect, useState} from "react";
import {getAllVictims, getAllVictimsTest, getOwnerAddress, getRaffleState} from "../contract/query";
import {
    execAddSeveralVictims, execModifyAmountReceived,
    execRaffleVersion,
    execTransfertOwnership
} from "../contract/execute";
import ChangeOwnership from "../components/ChangeOwnership";
import RaffleVersion from "../components/RaffleVersion";


function Home(){
    const networkAllowed = "pisco";

    const {
        status,
        availableConnectTypes,
        connect,
        disconnect
    } = useWallet();
    const connectedWallet = useConnectedWallet();

    const [ ownerAddress, setOwnerAddress ] = useState("");
    const [ raffleVersion, setRaffleVersion ] = useState(0);
    const [ victims, setVictims ] = useState([]);

    const [ queryOwnerSucceed, setQueryOwnerSucceed ] = useState(false);
    const [ queryRaffleSucceed, setQueryRaffleSucceed ] = useState(false);
    const [ queryVictimsSucceed, setQueryVictimsSucceed ] = useState(false);

    const [ loadingAddVictims, setLoadingAddVictims ] = useState(false);
    const [ loadingChangeOwnership, setLoadingChangeOwnership ] = useState(false);
    const [ loadingRaffleVersion, setLoadingRaffleVersion ] = useState(false);
    const [ loadingModifyVictims, setLoadingModifyVictims ] = useState(false);

    const handleSendList = (list) => {

        if (connectedWallet) {
            let victimsToAdd = []
            list.forEach((item) => {
                victimsToAdd.push({ address: item.address, owed: (item.amount * 1e6).toString(), onchain: item.onchain})
            })

            setLoadingAddVictims(true)
            execAddSeveralVictims(connectedWallet, victimsToAdd)
                .then(tx => {
                    setLoadingAddVictims(false)
                    if(tx.logs.length === 1){
                        toast.success("Transaction succeed")
                        //requestAllVictims()
                    }
                    else
                        toast.error("Tx Failed: " + tx.raw_log.split(':')[2])
                })
                .catch((error) => {
                    setLoadingAddVictims(false)
                    toast.error("Error while sending Tx")
                });
        }
        else
            toast.error("Wallet not connected")
    }

    const handleOwnership = (address) => {
        if (connectedWallet) {

            setLoadingChangeOwnership(true)
            execTransfertOwnership(connectedWallet, address)
                .then(tx => {
                    setLoadingChangeOwnership(false)
                    if(tx.logs.length === 1){
                        toast.success("Transaction succeed")
                        requestOwnerAddress()
                    }
                    else
                        toast.error("Tx Failed: " + tx.raw_log.split(':')[2])
                })
                .catch((error) => {
                    setLoadingChangeOwnership(false)
                    toast.error("Error while sending Tx")
                });
        }
        else
            toast.error("Wallet not connected")
    }

    const handleRaffleVersion = () => {
        if (connectedWallet) {
            setLoadingRaffleVersion(true)
            execRaffleVersion(connectedWallet, raffleVersion+1)
                .then(tx => {
                    setLoadingRaffleVersion(false)
                    if(tx.logs.length === 1){
                        toast.success("Transaction succeed")
                        requestRaffleState()
                    }
                    else
                        toast.error("Tx Failed: " + tx.raw_log.split(':')[2])
                })
                .catch((error) => {
                    console.log(error);
                    setLoadingRaffleVersion(false)
                    toast.error("Error while sending Tx")
                });
        }
        else
            toast.error("Wallet not connected")
    }

    const handleModifyReceived = (list) => {
        //toast.success(`Removed address${list.length > 1 ? "es" : ""} from Contract successfully.`)
        //toast.info("Feature not implemented yet")
        if (connectedWallet) {
            setLoadingModifyVictims(true)
            execModifyAmountReceived(connectedWallet, list)
                .then(tx => {
                    setLoadingModifyVictims(false)
                    if(tx.logs.length === 1){
                        toast.success("Transaction succeed")
                        requestAllVictims()
                    }
                    else
                        toast.error("Tx Failed: " + tx.raw_log.split(':')[2])
                })
                .catch((error) => {
                    setLoadingModifyVictims(false)
                    toast.error("Error while sending Tx")
                });
        }
        else
            toast.error("Wallet not connected")
    }

    const requestOwnerAddress = () => {
        getOwnerAddress()
            .then(address => {
                setOwnerAddress(address.owner_address)
                setQueryOwnerSucceed(true)
            })
            .catch((error) => {
                setQueryOwnerSucceed(false)
                console.error("Score fetch error:", error);
            });
    }

    const requestRaffleState = () => {
        getRaffleState()
            .then(state => {
                setRaffleVersion(state.raffle_state)
                setQueryRaffleSucceed(true)
            })
            .catch((error) => {
                setQueryRaffleSucceed(false)
                console.error("Score fetch error:", error);
            });
    }

    const requestAllVictims = () => {
        getAllVictims()
            .then(datas => {
                setVictims(datas.victims)
                setQueryVictimsSucceed(true)
            })
            .catch((error) => {
                setQueryVictimsSucceed(false)
                console.error("All victims error:", error);
            });
    }

    useEffect(() => {
        requestOwnerAddress()
        requestRaffleState()
        requestAllVictims()
    }, [])


    return(
        <div className="container">
            {
                status === WalletStatus.WALLET_CONNECTED ? (
                    <>
                        <div className="flex justify-between items-center">
                            <span className="caption text-sm md:text-xs text-gray-500 mt-4">Address: {truncate(connectedWallet.walletAddress)}</span>
                            <button className="btn btn-xs" onClick={disconnect}>Disconnect</button>
                        </div>
                        {
                            (connectedWallet && !connectedWallet.network.chainID.startsWith(networkAllowed)) && (
                                <div className="alert alert-error shadow-lg my-8 justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                         className="stroke-current flex-shrink-0 h-6 w-6" fill="none"
                                         viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                    </svg>
                                    <span><strong>Wrong Wallet Network.</strong>Change network and refresh</span>
                                </div>
                            )
                        }
                    </>
                ) : (
                    <div className="flex justify-center">
                        {
                            availableConnectTypes.map((connectType) => (
                                connectType === "EXTENSION" && (
                                    <button
                                        key={connectType}
                                        onClick={() => connect(connectType)}
                                        className="btn btn-sm btn-accent gap-2 mt-4"
                                    >
                                        <span>Connect Wallet</span>
                                    </button>
                                )
                            ))
                        }
                    </div>
                )
            }
            <AddVictims handleSendList={handleSendList}
                        loading={loadingAddVictims}
                        enabled={status === WalletStatus.WALLET_CONNECTED}/>
            <ChangeOwnership handleOwnership={handleOwnership}
                             actualOwnerAddr={ownerAddress}
                             querySucceed={queryOwnerSucceed}
                             loading={loadingChangeOwnership}
                             enabled={status === WalletStatus.WALLET_CONNECTED}/>
            <RaffleVersion handleRaffleVersion={handleRaffleVersion}
                           actualVersion={raffleVersion}
                           querySucceed={queryRaffleSucceed}
                           loading={loadingRaffleVersion}
                           enabled={status === WalletStatus.WALLET_CONNECTED}/>
            <ListContract modifyReceived={handleModifyReceived}
                          victims={victims}
                          querySucceed={queryVictimsSucceed}
                          loading={loadingModifyVictims}
                          enabled={status === WalletStatus.WALLET_CONNECTED}/>
        </div>
    )
}

export default Home