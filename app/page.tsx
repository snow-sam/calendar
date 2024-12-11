"use client"

import { getTodos } from "@/actions/todos";
import Navbar from "@/components/NavBar";
import TodosSection from "@/components/TodosSection";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { TodoType } from "./types";
import { eachDayOfInterval, endOfWeek, setDefaultOptions, startOfWeek, addDays, subDays } from "date-fns";
import { useQueryState, parseAsIsoDate } from "nuqs";
import { enUS } from 'date-fns/locale';


export default function Home() {
  const [todos, setTodos] = useState<TodoType[]>([])
  const [date, setDate] = useQueryState("date", parseAsIsoDate.withDefault(new Date()))

  setDefaultOptions({ locale: enUS })

  useEffect(() => {
    function fetchTodos() {
      const todos = getTodos(date)
      setTodos(todos)
    }
    fetchTodos()
  }, [])

  const days = eachDayOfInterval({
    start: startOfWeek(date),
    end: endOfWeek(date)
  })

  const handlePreviousWeek = () => setDate(subDays(date, 7))

  const handleNextWeek = () => setDate(addDays(date, 7))

  return (
    <main className="selection:text-neutral-100 selection:bg-neutral-800">
      <Navbar date={date} days={days} setDate={setDate} handlePreviousWeek={handlePreviousWeek} handleNextWeek={handleNextWeek}/>
      <TodosSection todos={todos} />
      <button className="absolute right-8 bottom-8"><Plus /></button>
    </main>
  );
}