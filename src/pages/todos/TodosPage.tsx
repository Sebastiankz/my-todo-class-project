import { TodoList } from "@/features/todolist";
import { LogoutButton } from "@/features/auth";

export default function TodosPage() {
  return (
    <div>
      <h1>My Todos</h1>
      <TodoList />
      <LogoutButton />
    </div>
  );
}
