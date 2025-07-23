import React, { useState } from "react";

const TodoForm = ({tasks,setTasks}) => {
  const [value,setValue]=useState("");

  const newtask={
    id:Date.now(),
    text:value,
    completed:false,
  } 
  console.log(tasks);
  return (
    <div className="flex relative  items-center  justify-center h-22  ">
      <div className="flex items-center justify-center p-4 gap-5  text-2xl overflow-scroll">
        <input className="border-1 relative ml-0  max-md:py-2 max-md:px-2 max-md:w-85 py-4 px-3 font-semibold font-sans w-99 rounded-2xl focus:outline-none "
        type="text"
        value={value} 
        onChange={(e)=>setValue(e.target.value)}
        placeholder="Enter a task... "
        onKeyDown={(e)=>{
          if(e.key=="enter")
          {
            setValue(e.target.value)
          }
        }}
        />
        
           <button className=" absolute  right-[98.7px]  bg-blue-900  text-2xl max-md:text-[20px] max-md:p-2 font-semibold px-3 pl-5 mr-1 pr-4  py-4 bg-blue rounded-2xl text-white cursor-pointer" onClick={()=>{setTasks((prev)=>[...prev,newtask]),setValue("")}}>Add</button>
    </div>
         
    </div>
  )
};

export default TodoForm;
