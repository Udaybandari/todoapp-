import React, { useEffect,useState } from "react";
import Header from "./Components/Header";
import TodoForm from "./Components/TodoForm";
import TodoItem from "./Components/TodoItem";

const App = () => {
  
  const [tasks,setTasks]=useState(()=>{
    const saved=localStorage.getItem("tasks");
    return saved?JSON.parse(saved):[];
  });
  useEffect(() => { localStorage.setItem("tasks", JSON.stringify(tasks)) }, [tasks])
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
const [filter, setFilter] = useState("all");

  return (
   <section className="flex items-center justify-center gap-22 dark:bg-black h-screen ">
     <div className="w-[600px]  mt-8   max-lg:w-[500px] max-lg:m-18 max-md:w-[500px]  max-md:h-[500px] h-[700px]  shadow-custom rounded-3xl dark:bg-gray-950 dark:text-white dark:shadow-custom   " >
   <Header theme={theme} setTheme={setTheme}  />
   <TodoForm tasks={tasks} setTasks={setTasks} filter={filter} />
   <TodoItem tasks={tasks} setTasks={setTasks} filter={filter}/>
   <div className="flex  gap-12 justify-center items-center">
  <button onClick={() => setFilter("all")} className={`text-[22px] w-22 font-semibold border-2 rounded-2xl cursor-pointer  ${filter=="all"?"bg-green-500 border-black":"bg-gray-100 duration-200"}`}><span>🔘</span>All</button>
  <button onClick={() => setFilter("completed")} className={`text-[22px]  w-40 font-semibold border-2 rounded-2xl cursor-pointer  ${filter=="completed"?"bg-green-500 border-black text-white":"bg-white"}`}><span>✅</span>Completed</button>
  <button onClick={() => setFilter("active")} className={`text-[22px] w-33 font-semibold border-2 rounded-2xl  cursor-pointer ${filter=="active"?"bg-blue-500 text-white border-black":"bg-gray-100"}`}><span>📌</span>Active</button>
</div>
    </div>
    

   </section>
  )
};

export default App;
