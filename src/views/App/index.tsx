import React from "react";
import { useToDoStore } from "../../data/stores/useToDoStore";
import { InputPlus } from "../components/InputPlus";
import { InputTask } from '../components/InputTask';

import styles from './index.module.scss';

export const App: React.FC = () => {
    const [
        tasks,
        createTask,
        updateTask,
        removeTask,
        updateTaskOnDone,
    ] = useToDoStore(state => [
        state.tasks,
        state.createTask,
        state.updateTask,
        state.removeTask,
        state.updateTaskOnDone,
    ]);

    const unfinishedTasks = tasks.filter(task => !task.isChecked);
    const finishedTasks = tasks.filter(task => task.isChecked);

    return (
        <article className={styles.article}>
            <h1 className={styles.articleTitle}>To Do App</h1>
            <section className={styles.articleSection}>
                <InputPlus
                    onAdd={(title) => {
                        if (title) {
                            createTask(title);
                        }
                    }}
                />
            </section>
            <section className={styles.articleSection}>
                {!tasks.length && (
                    <p className={styles.articleText}> There is no one task. </p>
                )}
                {unfinishedTasks.map(task => (
                    <InputTask
                        id={task.id}
                        key={task.id}
                        title={task.title}
                        isChecked={task.isChecked}
                        onDone={updateTaskOnDone}
                        onEdited={updateTask}
                        onRemoved={removeTask}
                    />
                ))}
                {finishedTasks.map(task => (
                    <InputTask
                        id={task.id}
                        key={task.id}
                        title={task.title}
                        isChecked={task.isChecked}
                        onDone={updateTaskOnDone}
                        onEdited={updateTask}
                        onRemoved={removeTask}
                    />
                ))}
            </section>
        </article>
    );
};

export default App;
