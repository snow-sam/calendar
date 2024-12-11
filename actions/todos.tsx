import { TodoType } from "@/app/types"

const todos: TodoType[] = [
    { id: 1, title: "Lavar a louça", date: new Date(), dueDate: "11:00", isDone: false, description: 'Testando', badge: 'trabalho'},
    { id: 2, title: "Dimensionar o projeto", date: new Date(), isDone: false, badge: "faculdade" },
    { id: 3, title: "Questionar o projeto", date: new Date(), isDone: true, dueDate: "09:00" },
]

export const getTodos = (day: Date): TodoType[] => {
    return todos
}