import Table from "./Table";
import {useState} from "react";

function ListContract({removeAddresses, enabled}){
    const data = [
        {
            address: '0x27834649302a193848923020',
            amount: 83784593,
            status: true,
            id:0
        },
        {
            address: '0x27834649302a193809484',
            amount: 274382,
            status: false,
            id:1
        },
        {
            address: '0x27834649302a193843457484',
            amount: 2344,
            status: false,
            id:2
        },
        {
            address: '0x2783464930289394594943',
            amount: 32934982,
            status: true,
            id:3
        },
        {
            address: '0x27483392302a193848923020',
            amount: 1233,
            status: false,
            id:4
        },
        {
            address: '0x27834649302a1AD9002',
            amount: 1000,
            status: true,
            id:5
        },
    ]

    const columns = [
        {
            Header: "Address",
            accessor: 'address',
        },
        {
            Header: "Amount",
            accessor: 'amount',
        },
        {
            Header: "Status",
            accessor: 'status',
        },
        {
            Header: "Remove",
            accessor: 'id',
        }
    ]

    const [ list, setList ] = useState([]);

    const handleButton = () => {
        removeAddresses(list);
    }

    return (
        <div className="mt-8">
            <div className="divider mb-8">Remove addresses from Contract</div>

            <div className="alert alert-info shadow-lg my-8 justify-center">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                         className="stroke-current flex-shrink-0 w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <div>
                        <span>
                        Select Addresses you want to remove from Contract.
                        <br/>
                        After sending Tx, refresh page to update datas.
                        <br/>
                        <strong>Caution:</strong> Switching page will remove precedent selections
                    </span>
                    </div>

                </div>
            </div>

            <Table columns={columns} data={data} list={list} setList={setList}/>

            <div className="card-actions justify-center my-8">
                <button onClick={handleButton} className={`btn btn-sm btn-error gap-2 ${ (!enabled || list.length === 0) && "btn-disabled"}`}>
                    <span>Remove selected victims</span>
                </button>
            </div>
        </div>
    )
}

export default ListContract