import AddVictims from "../components/AddVictims";
import ListContract from "../components/ListContract";
import {toast} from "react-toastify";
import { useWallet, useConnectedWallet, WalletStatus} from "@terra-money/wallet-provider";
import {truncate} from "../shared/Utils";

function Home(){
    const networkAllowed = "pisco";

    const {
        status,
        availableConnectTypes,
        connect,
        disconnect
    } = useWallet();
    const connectedWallet = useConnectedWallet();

    const handleSendList = (list) => {
        console.log("LIST:")
        console.log(list)
        toast.success("Sent the list to Contract successfully.")
    }

    const removeAddresses = (list) => {
        console.log("Remove:" + list)
        toast.success(`Removed address${list.length > 1 ? "es" : ""} from Contract successfully.`)
    }

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
            <AddVictims handleSendList={handleSendList} enabled={status === WalletStatus.WALLET_CONNECTED}/>
            <ListContract removeAddresses={removeAddresses} enabled={status === WalletStatus.WALLET_CONNECTED}/>
        </div>
    )
}

export default Home