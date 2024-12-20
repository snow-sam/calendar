"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon, LoaderCircle } from "lucide-react"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { Frequency, Task } from "@prisma/client"
import { useBadges } from "@/hooks/useBadges"
import { UseMutationResult } from "@tanstack/react-query"

const todoSchema = z.object({
    title: z.string().min(1),
    date: z.date().transform((date) => new Date(date.setHours(0, 0, 0, 0))),
    description: z.string().optional(),
    time: z.string().optional(),
    badgeId: z.string().optional(),
    frequency: z.enum([
        Frequency.ONCE,
        Frequency.DAILY,
        Frequency.WEEKLY,
        Frequency.MONTHLY,
        Frequency.YEARLY
    ])
})

type TodoFormProps = {
    submitFnc: UseMutationResult<Task, Error, any>
}

export const TodoForm = ({ submitFnc }: TodoFormProps) => {
    const [useEditor, setUseEditor] = useState(true)
    const badges = useBadges()

    const form = useForm<z.infer<typeof todoSchema>>({
        resolver: zodResolver(todoSchema),
        defaultValues: {
            title: "",
            date: new Date(),
            description: "",
            frequency: "ONCE",
            time: ""
        },
    })
    const { isSubmitting } = form.formState

    const onSubmit = (values: z.infer<typeof todoSchema>) => {
        console.log(values)
        submitFnc.mutate(values)
        form.reset()
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Título</FormLabel>
                            <FormControl>
                                <Input placeholder="Defina o título..." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex gap-5 items-center">
                    <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Data da Tarefa</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-fit pl-3 text-left font-normal",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                            >
                                                {field.value ? (
                                                    format(field.value, "dd/MM/yyyy")
                                                ) : (
                                                    <span>Escolha uma data</span>
                                                )}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            disabled={(date) => date < new Date("1900-01-01")}
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="time"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="flex flex-col">Horário</FormLabel>
                                <FormControl>
                                    <Input type="time" className="w-fit empty:bg-muted" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <FormField
                    control={form.control}
                    name="frequency"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Frequência</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger className="bg-muted">
                                        <SelectValue placeholder="Defina aqui a frequência" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {Object.values(Frequency).map((frequency) => (
                                        <SelectItem key={frequency} value={frequency}>
                                            <span className="capitalize">{frequency.toLowerCase()}</span>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="badgeId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Etiqueta</FormLabel>
                            <Select onValueChange={field.onChange}>
                                <FormControl>
                                    <SelectTrigger className="bg-muted">
                                        <SelectValue placeholder="Alguma ocasião especial?" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {Object.values(badges).map(({ id, title }) => (
                                        <SelectItem key={id} value={id}>
                                            <span className="capitalize">{title.toLowerCase()}</span>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </FormItem>
                    )}
                />
                <div className="items-center flex space-x-2">
                    <Checkbox checked={useEditor} onCheckedChange={(checked) => setUseEditor(checked as boolean)} id="editor" />
                    <div className="grid gap-0.5 leading-none">
                        <label
                            htmlFor="editor"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Usar editor
                        </label>
                    </div>
                </div>
                {!useEditor &&
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Descrição</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Conte mais sobre a tarefa"
                                        className="resize-none"
                                        {...field}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                }
                <Button className="w-full" type="submit" disabled={isSubmitting}>
                    {!isSubmitting ? "Adicionar" : <LoaderCircle className="h-4 w-4 animate-spin" />}
                </Button>
            </form>
        </Form >
    )
}