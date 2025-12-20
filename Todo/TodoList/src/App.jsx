import { useEffect, useState } from "react";

export default function App() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(null);

  // Load from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("todos")) || [];
    if (saved) setTodos(saved);
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }

  }, [todos]);

  const addTodo = () => {
    if (!task.trim()) return;

    if (editId !== null) {
      setTodos(
        todos.map((t) =>
          t.id === editId ? { ...t, text: task } : t
        ));
      setEditId(null);
    } else {
      setTodos([...todos, { id: Date.now(), text: task }]);
    }
    setTask("");
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  const editTodo = (todo) => {
    setTask(todo.text);
    setEditId(todo.id);
  };

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center">
      <div className="bg-gray-300 p-6 rounded-xl shadow-lg w-96">
        <h1 className="text-2xl font-bold text-center mb-4">Todo App</h1>

        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Enter task"
            className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring"
          />
          <button
            onClick={addTodo}
            className="bg-blue-500 text-white px-4 rounded hover:bg-blue-600"
          >
            {editId ? "Update" : "Add"}
          </button>
        </div>

        {todos.length === 0 ? (
          <p className="text-center text-gray-500">
            No tasks added yet
          </p>
        ) : (
          <ul className="space-y-2">
            {todos.map((todo) => (
              <li
                key={todo.id}
                className="flex justify-between items-center bg-gray-100 px-3 py-2 rounded"
              >
                <span>{todo.text}</span>
                <div className="space-x-2">
                  <button
                    onClick={() => editTodo(todo)}
                    className="bg-green-500 hover:bg-green-600 text-white font-bold h-8 w-14 rounded-xl"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="bg-red-500 hover:bg-red-600 font-bold text-white rounded-xl w-14 h-8"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
