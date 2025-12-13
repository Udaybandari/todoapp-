import React from "react";
import { RxCross2 } from "react-icons/rx";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { MdOutlineRadioButtonUnchecked } from "react-icons/md";

import { useState } from "react";

const TodoItem = ({tasks,setTasks,filter}) => {
 
  const [editId, setEditId] = useState(null);
const [editText, setEditText] = useState("");

    const handletoggle=(id)=>{
    setTasks(prev=>
         prev.map((t)=>t.id===id?{...t,completed:!t.completed}:t)
    );
  
} 
const handlechange=(id)=>{
  setTasks((prev)=>prev.map((a)=>a.id==id?{...a,text:editText}:a));
  setEditId(null);
  setEditText("");
}
console.log(editText)
const filteredTasks = tasks.filter(task => {
  if (filter === "completed") return task.completed;
  if (filter === "active") return !task.completed;
  return true; 
});

  
    
  return (
  <section className="  overflow-scroll h-92 max-md:h-66">
      <div className=" flex flex-col gap-3 justify-center mx-9 mt-8  items-center   ">
   {filteredTasks.map((task)=>(
    <div key={task.id} className="flex  w-full p-3 gap-4 relative shadow-custom rounded-2xl  overflow-hidden ">
  <button onClick={() => handletoggle(task.id)} className="cursor-pointer text-4xl">
  {task.completed ? <IoMdCheckmarkCircle /> : <MdOutlineRadioButtonUnchecked />}

</button>
        
   {editId==task.id?(
        <>
        <input
         type="text" 
         value={editText}
         onChange={(e)=>setEditText(e.target.value)} 
         className="rounded-md w-40 font-semibold"
         onKeyDown={(e)=>{
           if(e.key=="Enter")
           {
            handlechange(editId)
           }

         }}
         autoFocus
         />
         <button onClick={()=>handlechange(editId)} className="w-12 cursor-pointer text-sm border-1 rounded-md bg-gradient-to-r from-blue-400 to-blue-800 text-white font-semibold ">save </button>
        </>
   ):(    <div>
           <h1 className="text-4xl font-serif max-md:text-2xl  max-lg:text-2xl"> {tasks.text}</h1>
 
    </div>
   )}
       <button  className='cursor-pointer absolute right-13  text-2xl top-4' onClick={()=>{setEditId(task.id),setEditText(task.text)}} >✏️</button>
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
