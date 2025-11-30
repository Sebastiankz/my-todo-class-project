import { TodoList } from "@/features/todolist";
import { LogoutButton } from "@/features/auth";

export default function TodosPage() {
  return (
    <div className="relative">
      <div className="absolute top-4 right-4 z-10">
        <LogoutButton />
      </div>
      <TodoList />
    </div>
  );
}
