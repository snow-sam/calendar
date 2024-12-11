"use client"

import { Navbar } from "@/components/Navbar"
import TodosSection from "@/components/TodosSection";
import { Plus } from "lucide-react";

import { format, formatISO, eachDayOfInterval, endOfWeek, setDefaultOptions, startOfWeek } from "date-fns";
import { enUS } from 'date-fns/locale';
import { useTodos } from "@/hooks/useTodos";

const FMT_TITLE_DATE = 'LLLL, d'

export default function Home() {
  const { todos, ...dateNav } = useTodos()
  const { date, setDate, handlePreviousWeek, handleNextWeek } = dateNav

  const days = eachDayOfInterval({
    start: startOfWeek(date),
    end: endOfWeek(date)
  })

  const hasTodos = (date: Date): boolean => {
    const key = format(date, "yyyy-MM-dd")
    if (!todos.has(key)) return false
    return !todos.get(key)?.every(item => item.isDone)
  }

  setDefaultOptions({ locale: enUS })

  return (
    <main className="selection:text-neutral-100 selection:bg-neutral-800">
      <Navbar.Root>
        <Navbar.Title onClick={() => setDate(new Date())}>{format(date, FMT_TITLE_DATE)}</Navbar.Title>
        <Navbar.Options>
          {days.map((day, key) => (
            <Navbar.Option className="relative" onClick={() => setDate(day)} key={key}>
              {format(day, "E")}<br />{format(day, "d")}
              {hasTodos(day) && <span className="absolute top-0 rigth-0 translate-x-2 h-1.5 w-1.5 rounded-full bg-cyan-500"/>}
            </Navbar.Option>
          ))}
        </Navbar.Options>
      </Navbar.Root>
      <TodosSection todos={todos.get(format(date, "yyyy-MM-dd")) || []} />
      <button className="absolute right-8 bottom-8"><Plus /></button>
    </main>
  );
}