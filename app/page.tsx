import { getTodos } from "@/actions/todos";
import Navbar from "./components/NavBar";
import { Plus } from "lucide-react";


export default function Home() {
  const todos = getTodos(new Date())
  return (
    <main>
      <Navbar/>
      <button className="absolute right-8 bottom-8"><Plus/></button>
    </main>
  );
}