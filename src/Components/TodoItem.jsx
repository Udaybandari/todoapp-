import React from "react";
import { RxCross2 } from "react-icons/rx";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { MdOutlineRadioButtonUnchecked } from "react-icons/md";

import { useState } from "react";

const TodoItem = ({tasks,setTasks}) => {
    const handletoggle=(id)=>{
    setTasks(prev=>
         prev.map((t)=>t.id===id?{...t,completed:!t.completed}:t)


    );
}
  
    
  return (
    <div className=" flex flex-col gap-3 justify-center items-center  border-3 ">
   {tasks.map((task)=>(
    <div key={task.id} className="flex ">
  <button onClick={() => handletoggle(task.id)} className="cursor-pointer">
  {task.completed ? <IoMdCheckmarkCircle /> : <MdOutlineRadioButtonUnchecked />}

</button>

       <h1 className="text-4xl border-2 "> {task.text}</h1>
       <button  onClick={()=>setTasks(prev => prev.filter(t => t.id !==task.id))}>

       <RxCross2 className="text-4xl text-red-500 font-bold"  />
       </button>
        </div>
   ))}
       
    </div>
  )
};

export default TodoItem;
