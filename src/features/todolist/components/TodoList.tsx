import { useState } from "react";
import { useTodo } from "../hooks/useTodo";
import { useAuth } from "@/features/auth/hooks/useAuth";
import type { TodoType } from "../types";
import TodoItem from "./TodoItem";
import { Button, Input, TodoTable } from "./styled.tsx";

export default function TodoList() {
  const [todo, setTodo] = useState("");
  const { todos, addTodo, markAsDone, removeTodo } = useTodo();
  const { user } = useAuth();

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setTodo(value);
  };

  const onClick = () => {
    if (todo === "" || !user?.id) return;
    const now = new Date().toISOString();
    const value: TodoType = {
      content: todo,
      done: false,
      user_id: user.id,
      createdAt: now,
      updatedAt: now,
    };
    addTodo(value);
    setTodo("");
  };

  return (
    <>
      <h2>To do list</h2>
      <form>
        <div>
          <Input type="text" name="todo" value={todo} onChange={onChange} />
          <Button type="button" onClick={onClick}>
            Add
          </Button>
        </div>
      </form>

      {todos.length > 0 ? (
        <TodoTable>
          <thead>
            <tr>
              <th>Done</th>
              <th>Content</th>
              <th>Created at</th>
              <th>Updated at</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => (
              <TodoItem
                key={todo.createdAt}
                todo={todo}
                markAsDone={markAsDone}
                removeTodo={removeTodo}
              />
            ))}
          </tbody>
        </TodoTable>
      ) : (
        <p>No todos</p>
      )}
    </>
  );
}
