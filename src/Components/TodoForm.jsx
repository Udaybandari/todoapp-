import React, { useState } from "react";

const TodoForm = ({ setTasks }) => {
  const [value, setValue] = useState("");

  const addTodo = async () => {
    if (!value.trim()) return;
    try {
      const res = await fetch("http://localhost:3000/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          task: value,
          tags: ["react"],
          completed: false,
        }),
      });

      if (!res.ok) throw new Error("Failed to add todo");

      const newTodo = await res.json();

      setTasks(prev => [newTodo, ...prev]);
      setValue("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex relative items-center justify-center h-22">
      <div className="flex items-center justify-center p-4 gap-5 text-2xl overflow-scroll w-full max-w-[600px]">
        <input
          className="border rounded px-3 py-2 w-full font-semibold font-sans focus:outline-none"
          type="text"
          value={value}
          onChange={e => setValue(e.target.value)}
          placeholder="Enter a task..."
          onKeyDown={e => {
            if (e.key === "Enter") addTodo();
          }}
        />
        <button
          onClick={addTodo}
          className="bg-blue-900 text-white font-semibold rounded px-5 py-3 cursor-pointer"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default TodoForm;
