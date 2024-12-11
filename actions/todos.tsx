type Todo = {
    id: number,
    date: Date,
    title: string,
    description?: string,
    isDone: boolean,
    dueDate?: string,
    badge?: string,
}

const todos: Todo[] = [
    {id: 1, title: "Lavar a louça", date: new Date(), isDone: false},
    {id: 2, title: "Dimensionar o projeto", date: new Date(), isDone: false},
    {id: 1, title: "Questionar o projeto", date: new Date(), isDone: false},
]

export const getTodos = (day: Date): Todo[] => {
    return todos
}