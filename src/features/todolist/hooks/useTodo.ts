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

  const markAsDone = async (id: string) => {
    try {
      const updatedAt = new Date().toISOString();
      await todoApi.updateTodo(id, {
        done: true,
        updatedAt,
      });

      setTodos(
        todos.map((todo) =>
          todo._id === id ? { ...todo, done: true, updatedAt } : todo
        )
      );
    } catch (error) {
      console.error("Error marking todo as done:", error);
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

  return { todos, addTodo, removeTodo, markAsDone };
};
