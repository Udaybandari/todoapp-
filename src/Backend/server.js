const express=require("express");
const app=express();
const cors = require("cors");
const todoarr = [
  {
    id: 1,
    task: "create all APIs",
    tags: ["Nodejs", "javascript"],
    completed: false
  },
  {
    id: 2,
    task: "create all2 APIs",
    tags: ["Nodejs2"],
    completed: false
  },
  {
    id: 3,
    task: "Plan Project1",
    tags: ["javascript"],
    completed: true
  }
];

app.use(express.json()); // ✅ REQUIRED

app.use(cors());

app.get("/",(req,res)=>{
res.send("this is a tasktrek project");
})
app.get("/todos",(req,res)=>{
res.json(todoarr)
})
app.get("/todos/:id",(req,res)=>{
    const todo=todoarr.find((a)=>a.id==req.params.id)
    res.json(todo);
})
app.post("/todos", (req, res) => {
  const { task, tags } = req.body;

  if (!task) return res.status(400).json({ message: "task required" });
  if (!tags) return res.status(400).json({ message: "tags required" });

  const newtodo = {
    id: todoarr.length ? todoarr[todoarr.length - 1].id + 1 : 1,
    task,
    tags,
    completed: false   
  };

  todoarr.push(newtodo);
  res.status(201).json(newtodo);
});


app.put("/todos/:id", (req, res) => {
  const id = req.params.id;
  const { task, tags, completed } = req.body;

  const index = todoarr.findIndex(t => t.id == id);
  if (index === -1) {
    return res.status(404).json({ message: "Todo not found!" });
  }

  if (task) todoarr[index].task = task;
  if (tags) todoarr[index].tags = tags;
  if (typeof completed === "boolean") todoarr[index].completed = completed;

  res.json(todoarr[index]);
});

app.delete("/todos/:id",(req,res)=>{
const id=req.params.id;

const todoid=todoarr.findIndex((t)=>t.id==id);
if(todoid==-1)
{
    return res.status(404).json({message:"Todo not found!"});
}

const deletedTodo = todoarr.splice(todoid, 1);

  res.json({
    message: "Todo deleted successfully",
    todo: deletedTodo[0]
  });
})
const PORT=process.env.PORT||3000
app.listen(PORT,()=>{
    console.log(`server running on localhost ${PORT}`)
})