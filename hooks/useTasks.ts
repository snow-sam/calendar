"use client"

import { useUser } from '@clerk/clerk-react';
import queryClient from '@/lib/query';
import { useQuery, useMutation } from '@tanstack/react-query';
import { createTask, deleteTask, updateTask, getWeeklyTasks } from "@/actions/tasks"
import { toast } from 'react-hot-toast'
import { useState } from 'react';
import { Task } from '@prisma/client';

export const useTasks = (start: Date, end: Date) => {
    const queryKey = ['tasks', [start, end]]
    const { user } = useUser()
    const [toastID, setToastID] = useState("")

    const { data, isLoading, error } = useQuery({
        queryFn: () => getWeeklyTasks(start, end),
        enabled: !!(start && end),
        refetchOnWindowFocus: false,
        queryKey
    })

    const updateTaskRequest = useMutation({
        mutationFn: updateTask,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey })
            toast.success("Task updated!")
            toast.dismiss(toastID)
            setToastID("")
        },
        onError: () => {
            toast.error("Error updating the task!")
            toast.dismiss(toastID)
            setToastID("")
        },
        onMutate: () => setToastID(toast.loading("Updating task..."))
    })

    const deleteTaskRequest = useMutation({
        mutationFn: deleteTask,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey })
            toast.success("Task deleted!")
            toast.dismiss(toastID)
            setToastID("")
        },
        onError: () => {
            toast.error("Error deleting the task!")
            toast.dismiss(toastID)
            setToastID("")
        },
        onMutate: () => setToastID(toast.loading("Deleting task..."))
    })

    const createTaskRequest = useMutation({
        mutationFn: (data: Task) => createTask({...data, userId: user?.id || ''}),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey })
            toast.success("Task created!")
            toast.dismiss(toastID)
            setToastID("")
        },
        onError: () => {
            toast.error("Error creating the task!")
            toast.dismiss(toastID)
            setToastID("")
        },
        onMutate: () => setToastID(toast.loading("Creating the task..."))
    })

    return {
        data,
        error,
        isLoading,
        updateTaskRequest,
        deleteTaskRequest,
        createTaskRequest
    }
} 