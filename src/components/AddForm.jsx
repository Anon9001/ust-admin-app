import {useState} from "react";

function AddForm({addVictim}){
    const [ address, setAddress ] = useState('');
    const [amount, setAmount] = useState(0);
    const [onchain, setOnchain] = useState(false);

    const handleAddress = (e) => {
        setAddress(e.currentTarget.value)
    }

    const updateAmount = (e) => {
        const val = e.target.value;
        if (e.target.validity.valid)
            val === "" ? setAmount(0) : setAmount(val);
    }

    const handleCheckbox = () => {
        setOnchain(!onchain)
    }

    const handleSend = () => {
        if(address === "" || amount === 0)
            return;

        addVictim(address, amount, onchain);
        setAddress("");
        setAmount(0);
    }

    return (
        <div className="rounded-lg bg-gray-700 py-4 px-4 mb-4">
            <div className="flex flex-wrap -mx-3 mb-2">
                <div className="w-full md:w-3/5 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-400 text-xs font-bold mb-2">
                        Address
                    </label>
                    <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        value={address} id="address" onChange={handleAddress} type="text" placeholder="terra..."/>
                </div>
                <div className="w-full md:w-1/5 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-400 text-xs font-bold mb-2">
                        Amount
                    </label>
                    <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        value={amount !== 0 ? amount : ""}
                        onChange={updateAmount}
                        pattern="^-?[0-9]\d*\.?\d*$"
                        placeholder="0.0"
                        min="0" maxLength="15"
                        autoComplete="off" autoCorrect="off"
                        id="amount" type="text"/>
                </div>
                <div className="w-full md:w-1/5 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-400 text-xs font-bold mb-2"
                           htmlFor="grid-zip">
                        On-chain
                    </label>
                    <input type="checkbox" defaultChecked={onchain} onChange={handleCheckbox} className="toggle toggle-accent mt-2"/>
                </div>
            </div>
            <div className="card-actions justify-center mt-6">
                <button className={`btn btn-sm btn-accent gap-2 ${ address === "" && "btn-disabled"}`} onClick={handleSend}>
                    <span>Add to list</span>
                </button>
            </div>
        </div>
    )
}

export default AddForm