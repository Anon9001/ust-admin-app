function RaffleVersion({handleRaffleVersion, enabled, loading, querySucceed, actualVersion}) {
    return(
        <div className="mt-8">
            <div className="card border-2 border-gray-500 text-primary-content">
                <div className="card-body px-4 py-2">
                    <p className="text-md text-cyan-300 font-bold text-center uppercase">Change Raffle Version</p>
                    <div className="rounded-lg bg-gray-700 py-4 px-4 mb-4">
                        {
                            querySucceed ? (
                                <div>
                                    <div className="flex items-center justify-center">
                                        <p className="text-md font-bold text-center">Actual raffle version: {actualVersion}</p>
                                    </div>
                                    <div className="card-actions justify-center mt-4">
                                        <button className={`btn btn-sm btn-accent ${!enabled && "btn-disabled"} ${loading && "loading cursor-not-allowed"} `} onClick={handleRaffleVersion}>
                                            {
                                                !loading ? (
                                                    <span>Increment Raffle Version</span>
                                                ) : (
                                                    <span>Waiting</span>
                                                )

                                            }
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex items-center justify-center">
                                    <p className="text-md text-error font-bold text-center">Failed getting raffle version</p>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RaffleVersion