import { useEffect, useState } from "react";
import { todoApi } from "../api";
import type { TodoType } from "../types";

export const useTodo = () => {
  const [todos, setTodos] = useState<TodoType[]>([]);

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
      try {
        const data = await todoApi.getTodos();
        setTodos(data);
      } catch (error) {
        console.error("Error fetching todos:", error);
        throw error;
      }
    };

    fetchTodos();
  }, []);

  return { todos, addTodo, removeTodo, markAsDone };
};
