import { TodoType } from "@/app/types"

type TodosSectionProps = {
    todos: TodoType[]
}

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { badges, cn } from "@/lib/utils";


export const TodosSection = ({ todos }: TodosSectionProps) => {
    return (
        <Accordion type="multiple" className="w-full max-w-[700px] mx-auto">
            {todos.map(todo => {
                const badge = badges.get(todo.badge || "")
                const doneClass = todo.isDone ? "line-through text-neutral-400" : ""
                return (
                    <AccordionItem className="px-4" key={todo.id} value={todo.title}>
                        <AccordionTrigger className="flex justify-between w-full">
                            <span className={cn("block w-full overflow-hidden text-nowrap text-ellipsis", doneClass)}>
                                {todo.title}
                            </span>
                            <div className="flex gap-3 px-3">
                                <span className="font-bold text-neutral-400">{todo.dueDate && todo.dueDate}</span>
                                {badge && <Badge>{badge.role}</Badge>}
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