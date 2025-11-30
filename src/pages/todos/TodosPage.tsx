import { TodoList } from "@/features/todolist";
import { LogoutButton } from "@/features/auth";
import { SentryTestButton } from "@/components/SentryTestButton";

export default function TodosPage() {
  return (
    <div className="relative">
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
        <LogoutButton />
        <SentryTestButton />
      </div>
      <TodoList />
    </div>
  );
}
