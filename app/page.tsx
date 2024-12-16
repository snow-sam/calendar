"use client"
import useSwr from 'swr'

import { Navbar } from "@/components/Navbar"
import { TodosSection } from "@/components/TodosSection";
import { FormSheet } from "@/components/FormSheet";
import { Button } from "@/components/ui/button"

import { isSameDay, format, eachDayOfInterval, endOfWeek, setDefaultOptions, startOfWeek } from "date-fns";
import { enUS } from 'date-fns/locale';

import { useTodos } from "@/hooks/useTodos";
import { FMT_TITLE_DATE } from "@/app/constants"

import { ChevronLeft, ChevronRight } from "lucide-react";


export default function Home() {
  const { tasks, ...dateNav } = useTodos()
  const { date, setDate, handlePreviousWeek, handleNextWeek } = dateNav

  const days = eachDayOfInterval({
    start: startOfWeek(date),
    end: endOfWeek(date)
  })

  const hasTodos = (date: Date): boolean => {
    const key = format(date, "yyyy-MM-dd")
    if (!tasks?.has(key)) return false
    return !tasks.get(key)?.every(item => item.done)
  }

  setDefaultOptions({ locale: enUS })

  return (
    <main className="selection:text-neutral-100 selection:bg-neutral-800">
      <Navbar.Root>
        <div className="flex justify-between items-center">
          <Navbar.Title onClick={() => setDate(new Date())}>{format(date, FMT_TITLE_DATE)}</Navbar.Title>
          <Navbar.ActionsButton>
            <Button className="size-8" onClick={handlePreviousWeek} variant="outline" size="icon"><ChevronLeft /></Button>
            <Button className="size-8" onClick={handleNextWeek} variant="outline" size="icon"><ChevronRight /></Button>
          </Navbar.ActionsButton>
        </div>
        <Navbar.Options>
          {days.map((day, key) => (
            <Navbar.Option className={`relative ${isSameDay(day, date) ? 'font-bold' : 'opacity-30'}`} onClick={() => setDate(day)} key={key}>
              {format(day, "E")}<br />{format(day, "d")}
              {hasTodos(day) && <span className="absolute top-0 rigth-0 translate-x-2 h-1.5 w-1.5 rounded-full bg-orange-500" />}
            </Navbar.Option>
          ))}
        </Navbar.Options>
      </Navbar.Root>
      <TodosSection todos={tasks?.get(format(date, "yyyy-MM-dd")) || []} />
      <FormSheet/>
    </main>
  );
}