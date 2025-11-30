import type { TodoType } from "@/features/todolist/types";

import { Check, TodoCol } from "./styled";

const TodoItem = ({
  todo,
  markAsDone,
  removeTodo,
}: {
  todo: TodoType;
  markAsDone: (id: string) => void;
  removeTodo: (id: string) => void;
}) => {
  const handleDelete = () => {
    removeTodo(todo._id);
  };
  const handleDone = () => {
    markAsDone(todo._id);
  };
  return (
    <tr>
      <TodoCol>
        <Check type="checkbox" checked={todo.done} onChange={handleDone} />
      </TodoCol>
      <TodoCol>{todo.content}</TodoCol>
      <TodoCol>{todo.createdAt}</TodoCol>
      <TodoCol>{todo.updatedAt}</TodoCol>
      <TodoCol>
        <button onClick={handleDelete}>Delete</button>
      </TodoCol>
    </tr>
  );
};

export default TodoItem;
