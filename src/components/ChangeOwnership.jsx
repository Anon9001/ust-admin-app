import {useState} from "react";

function ChangeOwnership({handleOwnership, enabled, loading, querySucceed, actualOwnerAddr}) {
    const [ address, setAdress ] = useState('');

    const handleAddress = (e) => {
        setAdress(e.currentTarget.value)
    }

    const handleSend = () => {
        handleOwnership(address)
    }

    return (
        <div className="mt-8">
            <div className="card border-2 border-gray-500 text-primary-content">
                <div className="card-body px-4 py-2">
                    <p className="text-md text-cyan-300 font-bold text-center uppercase">Change Contract Ownership</p>
                    <div className="rounded-lg bg-gray-700 py-4 px-4 mb-4">
                        {
                            querySucceed ? (
                                <div className="flex items-center justify-center mb-4">
                                    <p className="text-sm md:text-xs break-all text-center text-gray-400">Actual owner: <strong>{actualOwnerAddr}</strong></p>
                                </div>
                            ) : (
                                <div className="flex items-center justify-center">
                                    <p className="text-sm text-error font-bold text-center">Failed getting owner address</p>
                                </div>
                            )
                        }

                        <div className="flex flex-wrap -mx-3 mb-2">
                            <div className="w-full px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-400 text-xs font-bold mb-2">
                                    Address
                                </label>
                                <input
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    value={address} id="address" onChange={handleAddress} type="text" placeholder="terra..."/>
                            </div>
                        </div>
                        <div className="card-actions justify-center mt-4">
                            <button className={`btn btn-sm btn-accent gap-2  ${(!enabled || address === '') && "btn-disabled"} ${loading && "loading cursor-not-allowed"}`} onClick={handleSend}>
                                {
                                    !loading ? (
                                        <span>Change ownership</span>
                                    ) : (
                                        <span>Waiting</span>
                                    )
                                }
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChangeOwnership