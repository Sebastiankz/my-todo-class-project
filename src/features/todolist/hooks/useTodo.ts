import { useEffect, useState } from "react";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { todoApi } from "../api";
import type { TodoType } from "../types";

export const useTodo = () => {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const { user } = useAuth();

  const addTodo = async (todo: TodoType) => {
    try {
      const data = await todoApi.createTodo(todo);
      if (data.inserted?.length > 0) {
        setTodos([...todos, data.inserted[0]]);
      }
    } catch (error) {
      console.error("Error adding todo:", error);
      throw error;
    }
  };

  const removeTodo = async (id: string) => {
    try {
      await todoApi.deleteTodo(id);
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error("Error removing todo:", error);
      throw error;
    }
  };

  const toggleDone = async (id: string, currentDoneStatus: boolean) => {
    try {
      const updatedAt = new Date().toISOString();
      await todoApi.updateTodo(id, {
        done: !currentDoneStatus,
        updatedAt,
      });

      setTodos(
        todos.map((todo) =>
          todo._id === id ? { ...todo, done: !currentDoneStatus, updatedAt } : todo
        )
      );
    } catch (error) {
      console.error("Error toggling todo:", error);
      throw error;
    }
  };

  const updateTodo = async (id: string, content: string) => {
    try {
      const updatedAt = new Date().toISOString();
      await todoApi.updateTodo(id, {
        content,
        updatedAt,
      });

      setTodos(
        todos.map((todo) =>
          todo._id === id ? { ...todo, content, updatedAt } : todo
        )
      );
    } catch (error) {
      console.error("Error updating todo:", error);
      throw error;
    }
  };

  useEffect(() => {
    const fetchTodos = async () => {
      if (!user?.id) return;

      try {
        const data = await todoApi.getTodos(user.id);
        setTodos(data);
      } catch (error) {
        console.error("Error fetching todos:", error);
        throw error;
      }
    };

    fetchTodos();
  }, [user?.id]);

  return { todos, addTodo, removeTodo, toggleDone, updateTodo };
};
