import { getTasks } from "@/actions/todos";
import { useQueryState, createParser } from "nuqs";
import { addDays, subDays, format, parse, isSameDay, endOfWeek, startOfWeek } from "date-fns";
import { useEffect, useState } from "react";
import { Task } from "@prisma/client";


const dateParser = createParser({
  parse: (value: string) => parse(value, 'yyyy-MM-dd', new Date()),
  serialize: (date: Date) => format(date, 'yyyy-MM-dd'),
  eq: (a: Date, b: Date) => isSameDay(a, b)
})

export const useTodos = () => {
    const [tasks, setTasks] = useState<Map<string, Task[]>>()
    const [date, setDate] = useQueryState("date", dateParser.withDefault(new Date()))
  
    useEffect(() => {
      const fetchTodos = async () => {
        const tasks = await getTasks(startOfWeek(date), endOfWeek(date))
        setTasks(tasks)
      }
      fetchTodos()
    }, [])

    const handlePreviousWeek = () => setDate(subDays(date, 7))

    const handleNextWeek = () => setDate(addDays(date, 7))

    return {
        tasks,
        date,
        setDate,
        handlePreviousWeek,
        handleNextWeek
    }
}