import logo from "../assets/logo-terra.png"

function Navbar(){
    return(
        <div className="navbar mb-2 shadow-lg bg-neutral text-neutral-content">
            <div className="navbar-start">
            </div>

            <div className="navbar-center">
                <img
                    width={20}
                    className='text-center mx-auto'
                    src={logo}
                    alt="UST restitution"
                />
                <span className="text-md font-bold ml-2">
                    UST Restitution -  Admin Dashboard
                </span>
            </div>
            <div className="navbar-end">
            </div>
        </div>
    )
}

export default Navbar;