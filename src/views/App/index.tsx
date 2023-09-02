import React, {useState} from 'react';
import {useToDoStore} from '../../data/stores/useToDoStore';
import {InputPlus} from '../components/InputPlus';
import {InputTask} from '../components/InputTask';
import {TaskFilter} from '../components/TaskFilter';

import styles from './index.module.scss';


export const App: React.FC = () => {
    const {
        tasks,
        createTask,
        updateTask,
        removeTask,
        updateTaskOnDone,
    } = useToDoStore(state => state);

    const [showCompleted, setShowCompleted] = useState<boolean>(false);
    tasks.filter(task => !task.isChecked);
    const finishedTasks = tasks.filter(task => task.isChecked);

    const visibleTasks = showCompleted ? finishedTasks : tasks;

    //Сортировка: если нужна
    // visibleTasks.sort((a, b) => {
    //     if (a.isChecked && !b.isChecked) {
    //         return 1;
    //     } else if (!a.isChecked && b.isChecked) {
    //         return -1;
    //     } else {
    //         return 0;
    //     }
    // });
    return (
        <div>
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
                <section>
                    <TaskFilter
                        onToggleView={(isVisible) => setShowCompleted(isVisible)}
                    />
                </section>
                <section className={styles.articleSection}>
                    {!tasks.length && (
                        <p className={styles.articleText}> There is no one task. </p>
                    )}
                    {visibleTasks.map(task => (
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
        </div>
    );
};

export default App;
