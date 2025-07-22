import React, { useEffect,useState } from "react";
import Header from "./Components/Header";
import TodoForm from "./Components/TodoForm";
import TodoItem from "./Components/TodoItem";

const App = () => {
  
  const [tasks,setTasks]=useState([]);
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
  useEffect(() => {
  console.log("Tasks updated:", tasks);
}, [tasks]);

  return (
   <section className="flex items-center justify-center dark:bg-black h-screen ">
     <div className="w-[600px]  mt-8   max-lg:w-[500px] max-lg:m-18 max-md:w-[400px]  max-md:h-[400px] h-[600px]  shadow-custom rounded-3xl dark:bg-gray-950 dark:text-white dark:shadow-custom  " >
   <Header theme={theme} setTheme={setTheme} />
   <TodoForm tasks={tasks} setTasks={setTasks}/>
   <TodoItem tasks={tasks} setTasks={setTasks}/>
    </div>
   </section>
  )
};

export default App;
