import { useState } from "react";
import { useTodo } from "@/features/todolist/hooks/useTodo";
import type { TodoType } from "@/features/todolist/types";
import TodoItem from "./todo-item";
import { Button, Input, TodoTable } from "./styled";

function Todo() {
  const [todo, setTodo] = useState("");
  const { todos, addTodo, markAsDone, removeTodo } = useTodo();

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setTodo(value);
  };

  const onClick = () => {
    if (todo === "") return;
    const now = new Date().toISOString();
    const value: TodoType = {
      content: todo,
      done: false,
      createdAt: now,
      updatedAt: now,
    };
    addTodo(value);
    setTodo("");
  };

  return (
    <>
      <h1>To do list</h1>
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

export default Todo;
