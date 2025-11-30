import { useState } from "react";
import { Pencil, Trash2, Check, X } from "lucide-react";
import type { TodoType } from "../types";

interface TodoItemProps {
  todo: TodoType;
  toggleDone: (id: string, currentDoneStatus: boolean) => void;
  updateTodo: (id: string, content: string) => void;
  removeTodo: (id: string) => void;
}

export default function TodoItem({
  todo,
  toggleDone,
  updateTodo,
  removeTodo,
}: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(todo.content);

  const handleDelete = () => {
    removeTodo(todo._id!);
  };

  const handleToggleDone = () => {
    toggleDone(todo._id!, todo.done);
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditedContent(todo.content);
  };

  const handleSave = () => {
    if (editedContent.trim() !== "") {
      updateTodo(todo._id!, editedContent);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditedContent(todo.content);
    setIsEditing(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      handleCancel();
    }
  };

  return (
    <div className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors group">
      {/* Checkbox */}
      <input
        type="checkbox"
        checked={todo.done}
        onChange={handleToggleDone}
        className="w-5 h-5 rounded border-gray-300 text-violet-600 focus:ring-2 focus:ring-violet-600 focus:ring-offset-0 cursor-pointer accent-violet-600"
      />

      {/* Content */}
      <div className="flex-1 min-w-0">
        {isEditing ? (
          <input
            type="text"
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            onKeyDown={handleKeyPress}
            autoFocus
            className="w-full px-3 py-2 border border-violet-300 rounded-lg focus:ring-2 focus:ring-violet-600 focus:border-transparent transition-all outline-none"
          />
        ) : (
          <div>
            <p
              className={`font-medium ${
                todo.done
                  ? "line-through text-gray-400"
                  : "text-gray-800"
              }`}
            >
              {todo.content}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              {new Date(todo.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
              title="Save"
            >
              <Check size={18} />
            </button>
            <button
              onClick={handleCancel}
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              title="Cancel"
            >
              <X size={18} />
            </button>
          </>
        ) : (
          <>
            <button
              onClick={handleEdit}
              className="p-2 text-violet-600 hover:bg-violet-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
              title="Edit"
            >
              <Pencil size={18} />
            </button>
            <button
              onClick={handleDelete}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
              title="Delete"
            >
              <Trash2 size={18} />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
