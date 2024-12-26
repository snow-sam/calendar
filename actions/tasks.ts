"use server"

import db from "@/lib/db"
import { Task } from "@prisma/client"
import { format } from "date-fns"

type UpdateTaskParams = Partial<Task> & { id: string };


export const getWeeklyTasks = async (startOfTheWeek: Date, endOfTheWeek: Date) => {
    const tasks = new Map()
    const data = await db.task.findMany({
        where: {
            date: {
                lte: endOfTheWeek,
                gte: startOfTheWeek,
            },
        }
    })
    data.forEach((task) => {
        const key = format(task.date, "yyyy-MM-dd")
        if (tasks.has(key)) tasks.set(key, [...tasks.get(key), task])
        else tasks.set(key, [task])
    })
    return tasks
}

export const createTask = async (data: Task) => {
    const resp = await db.task.create({ data })
    return resp
}

export const updateTask = async (updateData: UpdateTaskParams) => {
    const { id, ...data } = updateData
    const response = await db.task.update({data: data, where: { id }})
    return response
}

export const deleteTask = async ({id}: {id: string}) => {
    const response = await db.task.delete({where: {id}})
    return response
}