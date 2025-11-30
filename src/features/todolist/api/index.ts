import { api } from "@/lib/apli-client";
import config from "@/config";
import type { TodoType, CreateTodoResponse } from "../types";

export const todoApi = {
  getTodos: () => {
    return api.get<TodoType[]>(`${config.API_DATABASE_URL}/read`, {
      params: { tableName: "Items" },
    });
  },

  createTodo: (todo: TodoType) => {
    return api.post<CreateTodoResponse>(`${config.API_DATABASE_URL}/insert`, {
      tableName: "Items",
      records: [todo],
    });
  },

  updateTodo: (id: string, updates: Partial<TodoType>) => {
    return api.put(`${config.API_DATABASE_URL}/update`, {
      tableName: "Items",
      idColumn: "_id",
      idValue: id,
      updates,
    });
  },

  deleteTodo: (id: string) => {
    return api.delete(`${config.API_DATABASE_URL}/delete`, {
      tableName: "Items",
      idColumn: "_id",
      idValue: id,
    });
  },
};
