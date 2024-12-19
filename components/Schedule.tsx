"use client"

import { useQuery } from '@tanstack/react-query';
import { getTasks } from "@/actions/tasks"

import StandartNavbar from "@/components/Navbar"
import { Button } from "@/components/ui/button"
import { Toast } from "@/components/Toast"

import { startOfWeek, endOfWeek, format } from 'date-fns';
import { FMT_KEY_DATE } from '@/app/constants';
import { Task } from '@prisma/client';

import { Plus } from 'lucide-react';



type ScheduleProps = {
    date: Date,
    changeDay: React.Dispatch<React.SetStateAction<Date>>
}

export const Schedule = ({ date, changeDay }: ScheduleProps) => {
    const [start, end] = [startOfWeek(date), endOfWeek(date)]

    const { data, isLoading, error } = useQuery({
        queryKey: ['tasks', [start, end]],
        queryFn: () => getTasks(start, end),
        enabled: !!(start && end),
        refetchOnWindowFocus: false,
    })

    const hasTodos = (date: Date): boolean => {
        const key = format(date, FMT_KEY_DATE)
        return (data?.has(key) && data.get(key).some((item: Task) => !item.done))
    }

    return (
        <div>
            <StandartNavbar date={date} changeDay={changeDay} hasTodos={hasTodos} />
            <hr />
            
            {isLoading && <Toast type="loading"/>}
            {error && <Toast type="error"/>}
        </div>
    )
}