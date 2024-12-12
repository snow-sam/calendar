import { TodoForm } from "@/components/TodoForm"
import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

import { Plus } from "lucide-react";

export const FormSheet = () => {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button className="fixed right-8 bottom-8" size="icon" variant="ghost"><Plus /></Button>
            </SheetTrigger>
            <SheetContent side="bottom">
                <SheetHeader>
                    <SheetTitle>Criar nova tarefa</SheetTitle>
                    <SheetDescription>
                        Defina sua nova tarefa e se organize.
                    </SheetDescription>
                </SheetHeader>
                <TodoForm />
            </SheetContent>
        </Sheet>
    )
}