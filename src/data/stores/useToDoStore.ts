import {create} from "zustand";
import {generateId} from "../helpers.ts";
import {createJSONStorage, persist} from "zustand/middleware";

interface Task {
    id: string;
    title: string;
    createdAt: number;
    isChecked: boolean;
}

interface ToDoStore {
    tasks: Task[];
    createTask: (title: string) => void;
    updateTask: (id: string, title: string) => void;
    removeTask: (id: string) => void;
    updateTaskOnDone: (id: string, title: string) => void;
}
export const useToDoStore = create<ToDoStore>()(persist((set, get) => ({
    tasks: [],
    createTask: (title) => {
        const { tasks } = get();
        const newTask = {
            id: generateId(),
            title,
            createdAt: Date.now(),
            isChecked: false,
        };
        set({
            tasks: [newTask, ...tasks],
        });
    },

    updateTask: (id: string, title: string) => {
        const { tasks } = get();
        const updatedTasks = tasks.map((task) => ({
            ...task,
            title: task.id === id ? title : task.title,
        }));
        set({
            tasks: updatedTasks,
        });
    },

    updateTaskOnDone: (id: string, title: string) => {
        const { tasks } = get();
        const updatedTasks = tasks.map((task) => ({
            ...task,
            title: task.id === id ? title : task.title,
            isChecked: task.id === id ? !task.isChecked : task.isChecked,
        }));
        set({
            tasks: updatedTasks,
        });
        window.localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    },

    removeTask: (id) => {
        const { tasks } = get();
        set({
            tasks: tasks.filter((task) => task.id !== id),
        });
    },
}),{
    name: 'tasks',
    storage: createJSONStorage(() => sessionStorage),
}));

