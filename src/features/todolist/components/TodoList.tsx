import { Plus } from "lucide-react";
import { useTodo } from "../hooks/useTodo";
import { useAuth } from "@/features/auth/hooks/useAuth";
import TodoItem from "./TodoItem";
import TodoForm from "./TodoForm";

export default function TodoList() {
  const { todos, addTodo, toggleDone, updateTodo, removeTodo, loading } =
    useTodo();
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">My Tasks</h1>
          <p className="text-gray-600">
            Organize your day and boost your productivity
          </p>
        </div>

        {/* Add Task Form */}
        <div className="mb-6">
          <TodoForm onAddTodo={addTodo} userId={user.id} />
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
