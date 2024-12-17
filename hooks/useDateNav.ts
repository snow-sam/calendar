import { useQueryState, createParser } from "nuqs";
import { addDays, subDays, format, parse, isSameDay } from "date-fns";


const dateParser = createParser({
  parse: (value: string) => parse(value, 'yyyy-MM-dd', new Date()),
  serialize: (date: Date) => format(date, 'yyyy-MM-dd'),
  eq: (a: Date, b: Date) => isSameDay(a, b)
})

export const useDateNav = () => {
    const [date, setDate] = useQueryState("date", dateParser.withDefault(new Date(2024,11,16)))
    
    const handlePreviousWeek = () => setDate(subDays(date, 7))

    const handleNextWeek = () => setDate(addDays(date, 7))

    return {
        date,
        setDate,
        handlePreviousWeek,
        handleNextWeek
    }
}