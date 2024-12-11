import { getTodos } from "@/actions/todos";
import Navbar from "@/components/NavBar";
import TodosSection from "@/components/TodosSection";
import { Plus } from "lucide-react";


export default function Home() {
  const todos = getTodos(new Date())
  return (
    <main className="selection:text-neutral-100 selection:bg-neutral-800">
      <Navbar />
      <TodosSection todos={todos} />
      <button className="absolute right-8 bottom-8"><Plus /></button>
    </main>
  );
}