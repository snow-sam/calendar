"use server"

import db from "@/lib/db"
import { Task } from "@prisma/client"
import { format } from "date-fns"



export const getTasks = async (startOfTheWeek: Date, endOfTheWeek: Date) => {
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

export const setTask = async (data: Task) => {
    const resp = await db.task.create({ data })
    return resp
}

export const doTask = async ({id, done}: {id: string, done: boolean}) => {
    const response = await db.task.update({data: { done }, where: { id }})
    return response
}
