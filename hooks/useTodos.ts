import { TodoType } from "@/app/types";
import { getTodos } from "@/actions/todos";
import { useQueryState, createParser } from "nuqs";
import { addDays, subDays, format, parse, isSameDay } from "date-fns";
import { useEffect, useState } from "react";


const dateParser = createParser({
  parse: (value: string) => parse(value, 'yyyy-MM-dd', new Date()),
  serialize: (date: Date) => format(date, 'yyyy-MM-dd'),
  eq: (a: Date, b: Date) => isSameDay(a, b)
})

export const useTodos = () => {
    const [todos, setTodos] = useState<Map<string, TodoType[]>>(new Map())
    const [date, setDate] = useQueryState("date", dateParser.withDefault(new Date()))
  
    useEffect(() => {
      const fetchTodos = () => {
        const todos = getTodos()
        setTodos(todos)
      }
      fetchTodos()
    }, [])

    const handlePreviousWeek = () => setDate(subDays(date, 7))

    const handleNextWeek = () => setDate(addDays(date, 7))

    return {
        todos,
        date,
        setDate,
        handlePreviousWeek,
        handleNextWeek
    }
}