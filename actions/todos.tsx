import { TodoType } from "@/app/types"
import { format } from "date-fns"


const todos: TodoType[] = [
    { id: 1, title: "Definir Escopo", date: new Date('2024-12-11T05:00:00'), dueDate: "11:00", isDone: false, description: 'Descrição', badge: 'trabalho' },
    { id: 2, title: "Dimensionar o projeto", date: new Date('2024-12-10T05:00:00'), isDone: false, badge: "faculdade" },
    { id: 3, title: "Questionar o projeto", date: new Date('2024-12-12T05:00:00'), isDone: true, dueDate: "09:00" },
    { id: 4, title: "Definir Escopo", date: new Date('2024-12-13T05:00:00'), dueDate: "11:00", isDone: false, description: 'Testando', badge: 'trabalho' },
    { id: 5, title: "Dimensionar o projeto", date: new Date('2024-12-13T05:00:00'), isDone: false, badge: "faculdade" },
    { id: 6, title: "Questionar o projeto", date: new Date('2024-12-13T05:00:00'), isDone: true, dueDate: "09:00" },
]

export const getTodos = (): Map<string, TodoType[]> => {
    const mapTodos = new Map<string, TodoType[]>()
    todos.forEach((todo) => {
        const key = format(todo.date, "yyyy-MM-dd")
        if (mapTodos.has(key)) mapTodos.set(key, [...mapTodos.get(key) || [], todo])
        else mapTodos.set(key, [todo])
    })
    return mapTodos
}