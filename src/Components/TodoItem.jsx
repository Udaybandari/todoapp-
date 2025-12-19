import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { MdOutlineRadioButtonUnchecked } from "react-icons/md";

const TodoItem = ({ tasks, setTasks, filter }) => {
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  // Toggle completed: optimistic UI update + sync backend
  const handleToggle = async (_id, completed) => {
    setTasks(prev =>
      prev.map(t => (t._id === _id ? { ...t, completed: !completed } : t))
    );

    try {
      await fetch(`http://localhost:3000/todos/${_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !completed }),
      });
    } catch (err) {
      console.error("Toggle failed", err);
    }
  };

  // Delete todo
  const handleDelete = async _id => {
    try {
      const res = await fetch(`http://localhost:3000/todos/${_id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setTasks(prev => prev.filter(t => t._id !== _id));
      }
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  // Save edited todo
  const handleChange = async (_id, text) => {
    if (!text.trim()) return;

    try {
      const res = await fetch(`http://localhost:3000/todos/${_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task: text }),
      });

      if (!res.ok) return;

      const updatedTodo = await res.json();

      setTasks(prev =>
        prev.map(t => (t._id === _id ? updatedTodo : t))
      );

      setEditId(null);
      setEditText("");
    } catch (err) {
      console.error("Edit failed", err);
    }
  };

  // Filter logic
  const filteredTasks = tasks.filter(task => {
    if (filter === "completed") return task.completed;
    if (filter === "active") return !task.completed;
    return true;
  });

  return (
    <section className="overflow-scroll h-92 max-md:h-66">
      <div className="flex flex-col gap-3 mx-9 mt-8 items-center">
        {filteredTasks.map(task => (
          <div
            key={task._id}
            className="flex w-full p-3 gap-4 relative shadow-custom rounded-2xl"
          >
            {/* Toggle */}
            <button
              onClick={() => handleToggle(task._id, task.completed)}
              className="text-4xl cursor-pointer"
            >
              {task.completed ? (
                <IoMdCheckmarkCircle />
              ) : (
                <MdOutlineRadioButtonUnchecked />
              )}
            </button>

            {/* Text or Edit input */}
            {editId === task._id ? (
              <>
                <input
                  type="text"
                  value={editText}
                  onChange={e => setEditText(e.target.value)}
                  className="rounded-md w-40 font-semibold px-2"
                  autoFocus
                  onKeyDown={e => {
                    if (e.key === "Enter") {
                      handleChange(editId, editText);
                    }
                  }}
                />
                <button
                  onClick={() => handleChange(editId, editText)}
                  className="w-14 text-sm border rounded-md bg-blue-700 text-white font-semibold cursor-pointer"
                >
                  Save
                </button>
              </>
            ) : (
              <h1 className="text-4xl max-md:text-2xl font-serif">{task.task}</h1>
            )}

            {/* Edit button */}
            <button
              className="absolute right-14 top-4 cursor-pointer"
              onClick={() => {
                setEditId(task._id);
                setEditText(task.task);
              }}
            >
              ✏️
            </button>

            {/* Delete button */}
            <button onClick={() => handleDelete(task._id)}>
              <RxCross2 className="text-4xl max-md:text-2xl absolute right-2 top-3 text-red-500 cursor-pointer" />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TodoItem;
