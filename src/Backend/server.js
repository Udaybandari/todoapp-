require("./db"); // Connect to MongoDB
const express = require("express");
const cors = require("cors");
const Todo = require("./models/Todo");

const app = express();

app.use(express.json());
app.use(cors());

/* Root */
app.get("/", (req, res) => {
  res.send("🚀 TaskTrek backend running");
});

/* Get all todos */
app.get("/todos", async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* Get todo by id */
app.get("/todos/:id", async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).json({ message: "Todo not found" });
    res.json(todo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* Create new todo */
app.post("/todos", async (req, res) => {
  const { task, tags = [] } = req.body;

  if (!task || !task.trim()) {
    return res.status(400).json({ message: "Task is required" });
  }

  const newTodo = new Todo({
    task,
    tags,
    completed: false,
  });

  try {
    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* Update todo */
app.put("/todos/:id", async (req, res) => {
  const { task, tags, completed } = req.body;

  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).json({ message: "Todo not found" });

    if (task !== undefined) todo.task = task;
    if (tags !== undefined) todo.tags = tags;
    if (typeof completed === "boolean") todo.completed = completed;

    const updatedTodo = await todo.save();
    res.json(updatedTodo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* Delete todo */
app.delete("/todos/:id", async (req, res) => {
  try {
    const deletedTodo = await Todo.findByIdAndDelete(req.params.id);

    if (!deletedTodo) return res.status(404).json({ message: "Todo not found" });

    res.json({
      message: "Todo deleted successfully",
      todo: deletedTodo,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
