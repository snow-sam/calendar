import { addDays, subDays } from "date-fns";
import { useState } from "react";

export const useDateNav = () => {
  const [date, setDate] = useState(new Date())

  const handlePreviousWeek = () => setDate(subDays(date, 7))

  const handleNextWeek = () => setDate(addDays(date, 7))

  return {
    date,
    setDate,
    handlePreviousWeek,
    handleNextWeek
  }
}