import React from "react";


function Header() {
    return(
        <header className="border-b border-b-white p-3 bg-sky-800	">
           <div className="flex flex-row items-center justify-center">
                <a className="flex title-font font-medium items-center  justify-center text-gray-900">
                    <img src="/smug_anya.png"  width={75} height={75}></img>
                    <span className="ml-3 text-xl text-white">Weeb Info</span>
                </a>
            </div>
            
        </header>
    )
}

export default Header;