import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils";
import { Task } from "@prisma/client";
import { UseMutationResult } from "@tanstack/react-query"


type TaskSectionProps = {
    tasks: Task[]
    onTaskDone: UseMutationResult<Task, Error, Partial<Task> & { id: string }>
    onDeleteTask: UseMutationResult<Task, Error, { id: string }>
}


export const TaskSection = ({ tasks, onTaskDone, onDeleteTask }: TaskSectionProps) => {
    return (
        <Accordion type="multiple" className="w-full max-w-[700px] mx-auto">
            {tasks.map(task => {
                const doneClass = task.done ? "line-through text-neutral-400" : ""
                return (
                    <AccordionItem className="px-4" key={task.id} value={task.title}>
                        <AccordionTrigger className="hover:no-underline flex justify-between w-full text-de">
                            <span className={cn("block w-full overflow-hidden text-nowrap text-ellipsis", doneClass)}>
                                {task.title}
                            </span>
                            <div className="flex gap-3 px-3">
                                <span className="font-bold text-neutral-400">{task.time && task.time}</span>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="flex flex-col w-full">
                            {task.description}
                            <div className="flex flex-col space-y-2 mt-4">
                                <Button onClick={() => onTaskDone.mutate({ id: task.id, done: !task.done })} variant="outline">Done</Button>
                                <Button onClick={() => onDeleteTask.mutate({ id: task.id })} variant="destructive">Delete</Button>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                )
            })}
        </Accordion>
    )
}