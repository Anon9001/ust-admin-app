import Table from "./Table";
import {useState} from "react";

function ListContract({modifyReceived, enabled, loading, victims, querySucceed}){

    const columns = [
        {
            Header: "Address",
            accessor: 'address',
        },
        {
            Header: "Amount",
            accessor: 'victim.amount_owed',
        },
        {
            Header: "Received",
            accessor: 'victim.amount_recived',
        },
        {
            Header: "Modify",
            accessor: '',
        },
        {
            Header: "",
            accessor: 'id',
        }
    ]

    const [ list, setList ] = useState([]);

    const handleButton = () => {
        modifyReceived(list);
    }

    return (
        <div className="mt-8">
            {
                querySucceed ? (
                    <div className="card border-2 border-gray-500 text-primary-content mb-6">
                        <div className="card-body px-4 py-4">
                            <p className="text-md text-cyan-300 font-bold text-center uppercase mb-2">Modify amount received from contract</p>
                            <div className="alert alert-info shadow-lg my-2 justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     className="stroke-current flex-shrink-0 w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                </svg>
                                <div>
                                    <span>
                                        Select amounts you want to modify from Contract.
                                        <br/>
                                        After sending Tx, refresh page to update datas.
                                        <br/>
                                        <strong>Caution:</strong> Switching page will remove precedent selections
                                    </span>
                                </div>
                            </div>

                            <Table columns={columns} data={victims} list={list} setList={setList}/>

                            <div className="card-actions justify-center my-2">
                                <button onClick={handleButton} className={`btn btn-sm btn-accent gap-2 ${ (!enabled || list.length === 0) && "btn-disabled"} ${loading && "loading cursor-not-allowed"}`}>
                                    {
                                        !loading ? (
                                            <span>Modify selected amount received</span>
                                        ) : (
                                            <span>Waiting</span>
                                        )
                                    }
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="card border-2 border-gray-500 text-primary-content mb-6">
                        <div className="card-body px-6 py-6">
                            <div className="flex items-center justify-center">
                                <p className="text-sm text-error font-bold text-center">Failed getting victims data</p>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default ListContract