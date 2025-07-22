import React, { useState } from "react";

const TodoForm = ({tasks,setTasks}) => {
  const [value,setValue]=useState("");
  const[input,setInput]=useState("")
  const newtask={
    id:Date.now(),
    text:value,
    completed:false,
  } 
  console.log(tasks);
  return (
    <div className="flex relative  items-center  justify-center h-22  ">
      <div className="flex items-center justify-center p-4 gap-5  text-2xl overflow-scroll">
        <input className="border-1 ml-0  max-md:py-2 max-md:px-2 max-md:w-85 py-4 px-3 font-semibold font-sans w-99 rounded-2xl focus:outline-none "
        type="text"
        value={value} 
        onChange={(e)=>setValue(e.target.value)}
        placeholder="Enter a task... "
        />
        
           <button className="text-2xl max-md:text-[20px] max-md:p-2 font-semibold px-4 bg-blue-800 py-3 rounded-2xl text-white cursor-pointer" onClick={()=>{setTasks((prev)=>[...prev,newtask]),setValue("")}}>Add</button>
    </div>
         
    </div>
  )
};

export default TodoForm;
