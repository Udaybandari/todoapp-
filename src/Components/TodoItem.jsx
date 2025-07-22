import React from "react";
import { IoCheckmarkCircleOutline } from "react-icons/io5";

const TodoItem = ({tasks}) => {
    const[color,setColor]=useState(true);
  return (
    <div className=" flex justify-center items-center  ">
       <button onClick={color?'bg-blue':''}>
         <IoCheckmarkCircleOutline  />
       </button>
       <h1 className="text-4xl border-2 "> {tasks.text}</h1>
    </div>
  )
};

export default TodoItem;
