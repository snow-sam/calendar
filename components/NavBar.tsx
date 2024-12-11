'use client'

import { format} from "date-fns";
import { Suspense } from "react";

const FMT_TITLE_DATE = 'LLLL, d'

type NavBarProps = {
    date: Date,
    days: Date[],
    setDate: (value: Date | ((old: Date) => Date | null) | null) => Promise<URLSearchParams>
    handlePreviousWeek: () => Promise<URLSearchParams>,
    handleNextWeek: () => Promise<URLSearchParams>
}

const Navbar = ({date, days, setDate, handlePreviousWeek, handleNextWeek}: NavBarProps) => {
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