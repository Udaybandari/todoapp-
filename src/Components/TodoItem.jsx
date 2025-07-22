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
  <section className="  overflow-scroll h-92 max-md:h-66">
      <div className=" flex flex-col gap-3 justify-center mx-9 mt-8  items-center   ">
   {tasks.map((task)=>(
    <div key={task.id} className="flex  w-full p-3 gap-4 relative shadow-custom rounded-2xl  overflow-hidden ">
  <button onClick={() => handletoggle(task.id)} className="cursor-pointer text-4xl">
  {task.completed ? <IoMdCheckmarkCircle /> : <MdOutlineRadioButtonUnchecked />}

</button>

       <h1 className="text-4xl max-md:text-2xl  max-lg:text-2xl"> {task.text}</h1>
       <button  onClick={()=>setTasks(prev => prev.filter(t => t.id !==task.id))}>
       <RxCross2 className="text-4xl  max-md:text-2xl  max-md:right-4 max-md:top-5 absolute right-0 top-3 text-red-500 font-bold  cursor-pointer "  />
       </button>
        </div>
   ))}
       
    </div>
  </section>
  )
};

export default TodoItem;
