import React, { useState } from "react";

const Header = ({theme,setTheme}) => {
 
  return (
    <header className="  relative flex justify-center w-full h-30 mt-5  items-center max-md:flex-col max-md:h-18 ">
        <h1 className=" absolute left-12  hover:text-amber-800 text-5xl max-md:text-xl font-mono font-semibold ">Todo-List</h1>
        <button className="dark:bg-white absolute right-12 max-md:text-[9px] dark:text-black  max-md:w-15 p-3 max-md:p-2 text-2xl rounded-full max-lg:text-[14px] md:font-semibold bg-black text-white px-7"
        onClick={()=>setTheme(theme=="dark"?"light":"dark")}
        >{theme=="dark"?"LightMode":"DarkMode"}</button>
    </header>
  )
};

export default Header;
