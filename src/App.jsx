import React, { useEffect,useState } from "react";
import Header from "./Components/Header";

const App = () => {
    const[theme,setTheme]=useState('light'); 
  const element=document.documentElement
  useEffect(()=>{
      if (theme === 'dark') {
    localStorage.setItem("theme", "dark");
      element.classList.add("dark");

  } else {
    localStorage.setItem("theme", "light");
    element.classList.remove("dark");
  }
    },[theme]
  )
  return (
    <div className="w-[600px] max-lg:flex   max-lg:w-[500px] max-lg:m-18 max-md:w-[300px] max-md:mx-33 max-md:h-[300px] h-[600px] m-70 shadow-custom rounded-3xl dark:bg-gray-950 dark:text-white dark:shadow-black  " >
   <Header theme={theme} setTheme={setTheme}/>
    </div>
  )
};

export default App;
