import AddForm from "./AddForm";
import ListVictims from "./ListVictims";
import {useState} from "react";

function AddVictims({handleSendList, enabled}){

    const [ list, setList ] = useState([]);

    const handleRemove = (id) => {
        let filtered = list.filter(task => {
            return task.id !== id;
        });
        setList(filtered);
    }

    const addVictim = (address, amount, onchain) => {
        let copy = [...list];
        copy = [...copy, { id: list.length, address: address, amount: amount, onchain: onchain}];
        setList(copy);
    }

    const handleButton = () => {
        handleSendList(list)
    }

    return(
        <div className="mt-8">
            <div className="card border-2 border-gray-500 text-primary-content shadow-[0_0_60px_-10px] shadow-yellow-500">
                <div className="card-body p-6">
                    <p className="text-md text-cyan-300 font-bold text-center uppercase mb-4">Add Victims</p>
                    <AddForm addVictim={addVictim}/>
                    <div className="divider">List</div>
                    <ListVictims list={list} handleRemove={handleRemove} />
                    <div className="card-actions justify-center mt-2">
                        <button onClick={handleButton} className={`btn btn-sm btn-accent gap-2  ${ (!enabled  || list.length === 0) && "btn-disabled"}`}>
                            <span>Send List to Contract</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddVictims