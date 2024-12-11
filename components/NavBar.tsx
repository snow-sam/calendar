'use client'

import { eachDayOfInterval, endOfWeek, format, setDefaultOptions, startOfWeek } from "date-fns";
import { enUS } from 'date-fns/locale';
import { useQueryState } from "nuqs";
import { parseAsIsoDate } from "nuqs/server";
import { Suspense } from "react";

const FMT_TITLE_DATE = 'LLLL, d'

const Navbar = () => {
    const [date, setDate] = useQueryState("date", parseAsIsoDate.withDefault(new Date()))
    const days = eachDayOfInterval({
        start: startOfWeek(date),
        end: endOfWeek(date)
    })

    setDefaultOptions({ locale: enUS })
    
    return (
        <Suspense>
            <nav className="p-4 flex flex-col gap-2">
                <span onClick={() => setDate(new Date())}>{format(date, FMT_TITLE_DATE)}</span>
                <div className="flex self-center justify-between w-full max-w-96 text-center text-sm">
                    {days.map((day, key) => (
                        <span onClick={() => setDate(day)} key={key}>
                            {format(day, "E")}<br/>{format(day, "d")}
                        </span>
                    ))}
                </div>
            </nav>
        </Suspense>
    );
}

export default Navbar