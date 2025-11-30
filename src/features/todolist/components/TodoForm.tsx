import { useState } from "react";
import { Plus } from "lucide-react";
import type { TodoType } from "../types";

interface TodoFormProps {
  onAddTodo: (todo: TodoType) => Promise<void>;
  userId: string;
}

export default function TodoForm({ onAddTodo, userId }: TodoFormProps) {
  const [todo, setTodo] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (todo.trim() === "") {
      setError("Please enter a task");
      return;
    }

    setIsSubmitting(true);
    try {
      const now = new Date().toISOString();
      const value: TodoType = {
        content: todo,
        done: false,
        user_id: userId,
        createdAt: now,
        updatedAt: now,
      };
      await onAddTodo(value);
      setTodo("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add task");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <form onSubmit={handleSubmit} className="flex gap-3">
        <div className="flex-1">
          <input
            type="text"
            name="todo"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            placeholder="Add a new task..."
            disabled={isSubmitting}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-600 focus:border-transparent transition-all outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-violet-600 hover:bg-violet-700 text-white font-semibold px-6 py-3 rounded-lg transition-all shadow-lg shadow-violet-600/30 hover:shadow-xl hover:shadow-violet-600/40 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus size={20} />
          {isSubmitting ? "Adding..." : "Add"}
        </button>
      </form>
    </div>
  );
}
