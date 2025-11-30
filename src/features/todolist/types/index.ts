export interface TodoType {
  _id?: string;
  content: string;
  done: boolean;
  user_id: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTodoResponse {
  inserted?: TodoType[];
}
