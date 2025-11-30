import { useEffect, useState } from "react";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { todoApi } from "../api";
import type { TodoType } from "../types";

export const useTodo = () => {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const addTodo = async (todo: TodoType) => {
    setLoading(true);
    setError(null);
    try {
      const data = await todoApi.createTodo(todo);
      if (data.inserted?.length > 0) {
        setTodos((prevTodos) => [...prevTodos, data.inserted[0]]);
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to add todo";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const removeTodo = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await todoApi.deleteTodo(id);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to delete todo";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const toggleDone = async (id: string, currentDoneStatus: boolean) => {
    setLoading(true);
    setError(null);
    try {
      const updatedAt = new Date().toISOString();
      await todoApi.updateTodo(id, {
        done: !currentDoneStatus,
        updatedAt,
      });

      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo._id === id
            ? { ...todo, done: !currentDoneStatus, updatedAt }
            : todo
        )
      );
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to update todo";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateTodo = async (id: string, content: string) => {
    setLoading(true);
    setError(null);
    try {
      const updatedAt = new Date().toISOString();
      await todoApi.updateTodo(id, {
        content,
        updatedAt,
      });

      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo._id === id ? { ...todo, content, updatedAt } : todo
        )
      );
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to update todo";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchTodos = async () => {
      if (!user?.id) return;

      setLoading(true);
      setError(null);
      try {
        const data = await todoApi.getTodos(user.id);
        setTodos(data);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to fetch todos";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, [user?.id]);

  return { todos, addTodo, removeTodo, toggleDone, updateTodo, loading, error };
};
