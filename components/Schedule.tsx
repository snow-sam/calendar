"use client"

import { useQuery, useMutation } from '@tanstack/react-query';
import queryClient from '@/lib/query';
import { doTask, getTasks } from "@/actions/tasks"

import StandartNavbar from "@/components/Navbar"
import { TaskSection } from "@/components/TaskSection"
import { Toast } from "@/components/Toast"

import { startOfWeek, endOfWeek, format } from 'date-fns';
import { FMT_KEY_DATE } from '@/app/constants';
import { Task } from '@prisma/client';




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

    const setTaskDone = useMutation({
        mutationFn: doTask,
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['tasks', [start, end]] })
        },
      })

    const hasTodos = (date: Date): boolean => {
        const key = format(date, FMT_KEY_DATE)
        return (data?.has(key) && data.get(key).some((item: Task) => !item.done))
    }

    return (
        <div>
            <StandartNavbar date={date} changeDay={changeDay} hasTodos={hasTodos} />
            <hr />
            <TaskSection tasks={data?.get(format(date, FMT_KEY_DATE)) || []} setTaskDone={setTaskDone}/>
            {isLoading && <Toast type="loading"/>}
            {error && <Toast type="error"/>}
        </div>
    )
}