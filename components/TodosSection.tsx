import { TodoType } from "@/app/types"

type TodosSectionProps = {
    todos: Task[]
}

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { cn } from "@/lib/utils";
import { Task } from "@prisma/client";


export const TodosSection = ({ todos }: TodosSectionProps) => {
    return (
        <Accordion type="multiple" className="w-full max-w-[700px] mx-auto">
            {todos.map(todo => {
                const doneClass = todo.done ? "line-through text-neutral-400" : ""
                return (
                    <AccordionItem className="px-4" key={todo.id} value={todo.title}>
                        <AccordionTrigger className="flex justify-between w-full">
                            <span className={cn("block w-full overflow-hidden text-nowrap text-ellipsis", doneClass)}>
                                {todo.title}
                            </span>
                            <div className="flex gap-3 px-3">
                                <span className="font-bold text-neutral-400">{todo.time && todo.time}</span>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent>
                            {todo.description}
                        </AccordionContent>
                    </AccordionItem>
                )
            })}
        </Accordion>
    )
}