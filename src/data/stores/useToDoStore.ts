import { create, State, StateCreator } from "zustand";
import { generateId } from "../helpers.ts";

interface Task {
    id: string;
    title: string;
    createdAt: number;
    isChecked: boolean; // Добавляем свойство isChecked
}

interface ToDoStore {
    tasks: Task[];
    createTask: (title: string) => void;
    updateTask: (id: string, title: string) => void;
    removeTask: (id: string) => void;
    updateTaskOnDone: (id: string, title: string) => void;
}

function isToDoStore(object: any): object is ToDoStore {
    return 'tasks' in object;
}

const localStorageUpdate = <T extends State>(config: StateCreator<T>): StateCreator<T> =>
    (set, get, api) =>
        config((nextState, ...args) => {
            if (isToDoStore(nextState)) {
                window.localStorage.setItem('tasks', JSON.stringify(
                    nextState.tasks
                ));
            }
            set(nextState, ...args);
        }, get, api);

const getCurrentState = () => {
    try {
        return (JSON.parse(window.localStorage.getItem('tasks') || '[]')) as Task[];
    } catch (err) {
        window.localStorage.setItem('tasks', '[]'); // Исправлено "task" на "tasks"
    }
    return [];
}

export const useToDoStore = create<ToDoStore>(localStorageUpdate((set, get) => ({
    tasks: getCurrentState(),
    createTask: (title) => {
        const { tasks } = get();
        const newTask = {
            id: generateId(),
            title,
            createdAt: Date.now(),
            isChecked: false,
        };
        set({
            tasks: [newTask, ...tasks], // Исправлен порядок добавления новой задачи
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
})));
