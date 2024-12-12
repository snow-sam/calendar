import { TodoType } from "@/app/types";
import { getTodos } from "@/actions/todos";
import { useQueryState, parseAsIsoDate } from "nuqs";
import { addDays, subDays } from "date-fns";
import { useEffect, useState } from "react";

export const useTodos = () => {
    const [todos, setTodos] = useState<Map<string, TodoType[]>>(new Map())
    const [date, setDate] = useQueryState("date", parseAsIsoDate.withDefault(new Date()))
  
    useEffect(() => {
      function fetchTodos() {
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