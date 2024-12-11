import Navbar from "./components/NavBar";
import { Plus } from "lucide-react";


export default function Home() {
  return (
    <main>
      <Navbar/>
      <button className="absolute right-8 bottom-8"><Plus/></button>
    </main>
  );
}