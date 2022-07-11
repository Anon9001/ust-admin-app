import {nFormatter, truncate} from "../shared/Utils";

function ItemVictim({victim, handleRemove}){
    return(
        <div className="flex rounded-lg bg-gray-700 my-3 border border-gray-600 py-1 px-4">
            <div className="flex justify-between w-full">
                <p className="w-full w-3/5 text-sm break-all mr-4">{victim.address}</p>
                <p className="w-full w-2/5 text-sm">{ nFormatter(victim.amount, 2)}</p>
                <p className={`w-full w-1/5 text-sm ${victim.onchain ? ("text-success") : ("text-error")}`}>{victim.onchain ? ("On-chain") : ("Off-chain")}</p>

                <button onClick={() => handleRemove(victim.id)}  className="btn btn-xs btn-square bg-error hover:bg-red-500 text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                </button>

            </div>
        </div>
    )
}

export default ItemVictim