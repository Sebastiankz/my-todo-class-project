export interface TodoType {
  _id?: string;
  content: string;
  done: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTodoResponse {
  inserted?: TodoType[];
}
