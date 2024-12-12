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
                <Button className="absolute right-8 bottom-8" size="icon" variant="ghost"><Plus /></Button>
            </SheetTrigger>
            <SheetContent side="bottom">
                <SheetHeader>
                    <SheetTitle>Criar nova tarefa</SheetTitle>
                    <SheetDescription>
                        Defina sua nova tarefa e se organize.
                    </SheetDescription>
                </SheetHeader>

                <SheetFooter className="gap-2">
                    <SheetClose asChild>
                        <Button variant="outline">Cancelar</Button>
                    </SheetClose>
                    <SheetClose asChild>
                        <Button type="submit">Adicionar</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}