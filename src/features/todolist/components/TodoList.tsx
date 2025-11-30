import { useState } from "react";
import { Plus } from "lucide-react";
import { useTodo } from "../hooks/useTodo";
import { useAuth } from "@/features/auth/hooks/useAuth";
import type { TodoType } from "../types";
import TodoItem from "./TodoItem";

export default function TodoList() {
  const [todo, setTodo] = useState("");
  const [error, setError] = useState("");
  const { todos, addTodo, toggleDone, updateTodo, removeTodo } = useTodo();
  const { user } = useAuth();

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setTodo(value);
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (todo.trim() === "") {
      setError("Please enter a task");
      return;
    }

    if (!user) {
      setError("User not authenticated");
      return;
    }

    if (!user.id) {
      setError("User ID not found");
      console.error("User object:", user);
      return;
    }

    try {
      const now = new Date().toISOString();
      const value: TodoType = {
        content: todo,
        done: false,
        user_id: user.id,
        createdAt: now,
        updatedAt: now,
      };
      await addTodo(value);
      setTodo("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add task");
      console.error("Error adding todo:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            My Tasks
          </h1>
          <p className="text-gray-600">
            Organize your day and boost your productivity
          </p>
        </div>

        {/* Add Task Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <form onSubmit={handleSubmit} className="flex gap-3">
            <div className="flex-1">
              <input
                type="text"
                name="todo"
                value={todo}
                onChange={onChange}
                placeholder="Add a new task..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-600 focus:border-transparent transition-all outline-none"
              />
              {error && (
                <p className="text-red-500 text-sm mt-2">{error}</p>
              )}
            </div>
            <button
              type="submit"
              className="bg-violet-600 hover:bg-violet-700 text-white font-semibold px-6 py-3 rounded-lg transition-all shadow-lg shadow-violet-600/30 hover:shadow-xl hover:shadow-violet-600/40 flex items-center gap-2"
            >
              <Plus size={20} />
              Add
            </button>
          </form>
        </div>

        {/* Tasks List Card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {todos.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {todos.map((todo) => (
                <TodoItem
                  key={todo._id || todo.createdAt}
                  todo={todo}
                  toggleDone={toggleDone}
                  updateTodo={updateTodo}
                  removeTodo={removeTodo}
                />
              ))}
            </div>
          ) : (
            <div className="p-12 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                <Plus size={32} className="text-gray-400" />
              </div>
              <p className="text-gray-500 text-lg">No tasks yet</p>
              <p className="text-gray-400 text-sm mt-1">
                Add your first task to get started
              </p>
            </div>
          )}
        </div>

        {/* Stats Footer */}
        {todos.length > 0 && (
          <div className="mt-6 flex justify-between items-center text-sm text-gray-600 px-4">
            <span>
              {todos.filter((t) => t.done).length} of {todos.length} completed
            </span>
            <span>{todos.filter((t) => !t.done).length} remaining</span>
          </div>
        )}
      </div>
    </div>
  );
}
