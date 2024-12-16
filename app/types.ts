import { Prisma } from "@prisma/client"

export type TodoType = {
    id: number,
    date: Date,
    title: string,
    description?: string,
    isDone: boolean,
    dueDate?: string,
    badge?: string,
}

export type Badge = { role: string, }


export type GroupByTasks = (Prisma.PickEnumerable<Prisma.TaskGroupByOutputType, "date"[]> & {})[]