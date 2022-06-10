import ItemVictim from "./ItemVictim";

function ListVictims({list, handleRemove}){
    return(
        <div className="my-2 overflow-y-auto max-h-96">
            {
                list.length === 0 ? (
                    <div className="flex items-center justify-center">
                        <p className="text-md font-bold text-gray-500 text-center">No victim added yet...</p>
                    </div>
                ) : (
                    <>
                        <div className="flex justify-between items-center">
                            <span className="caption w-full w-3/5 text-xs md:text-xs text-gray-500">Address</span>
                            <span className="caption w-full w-2/5 text-xs md:text-xs text-gray-500">Amount</span>
                            <span className="caption w-full w-1/5 text-xs md:text-xs text-gray-500">On-chain</span>
                            <span className="caption text-xs md:text-xs text-gray-500 text-right">Remove</span>
                        </div>
                        {
                            list.map(victim => {
                                return (
                                    <ItemVictim key={victim.id} victim={victim} handleRemove={handleRemove}/>
                                )
                            })
                        }
                    </>
                )
            }

        </div>
    )
}

export default ListVictims