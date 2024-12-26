"use client"

import { startOfWeek, endOfWeek, format } from 'date-fns';
import { Task } from '@prisma/client';
import { Toaster } from 'react-hot-toast'
import { LoaderCircle } from "lucide-react";

import { FMT_KEY_DATE } from '@/app/constants';
import { useTasks } from "@/hooks/useTasks"

import StandartNavbar from "@/components/Navbar"
import { TaskSection } from "@/components/TaskSection"
import { DrawerDialog } from "@/components/DialogDrawer"
import { TaskForm } from "@/components/TaskForm"


type ScheduleProps = {
    date: Date,
    changeDay: React.Dispatch<React.SetStateAction<Date>>
}

export const Schedule = ({ date, changeDay }: ScheduleProps) => {
    const [start, end] = [startOfWeek(date), endOfWeek(date)]
    const { data, isLoading, error, ...requestFnc } = useTasks(start, end)
    const { createTaskRequest, updateTaskRequest, deleteTaskRequest } = requestFnc

    const hasTodos = (date: Date): boolean => {
        const key = format(date, FMT_KEY_DATE)
        return (data?.has(key) && data.get(key).some((item: Task) => !item.done))
    }

    return (
        <div>
            <StandartNavbar date={date} changeDay={changeDay} hasTodos={hasTodos} />
            <hr />
            {isLoading && <div className='absolute size-6 text-neutral-600 left-1/2 bottom-1/2 -translate-x-1/2'><LoaderCircle className="animate-spin size-6 text-neutral-700"/></div>}
            <TaskSection
                tasks={data?.get(format(date, FMT_KEY_DATE)) || []}
                onTaskDone={updateTaskRequest}
                onDeleteTask={deleteTaskRequest} />
            <DrawerDialog>
                <TaskForm onSubmit={createTaskRequest} />
            </DrawerDialog>
            <Toaster position='bottom-center' toastOptions={{style: {background: '#18181b', color: '#FFF'}}}/>
        </div>
    )
}