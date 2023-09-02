import React, {useState} from 'react';
import style from './index.module.scss';
import {useToDoStore} from '../../../data/stores/useToDoStore.ts';
import Tooltip from "../Tooltip";

interface TaskCounterProps {
    onToggleView: (showCompleted: boolean) => void;
}

export const TaskFilter: React.FC<TaskCounterProps> = ({onToggleView}) => {
    const {tasks} = useToDoStore((state) => state);
    const [isAllTasksVisible, setIsAllTasksVisible] = useState<boolean>(true);

    const handleToggleView = (showCompleted: boolean) => {
        setIsAllTasksVisible(!showCompleted);
        onToggleView && onToggleView(showCompleted);
    };

    const completed = tasks.filter((task) => task.isChecked).length.toString()
    const unCompleted = tasks.filter((task) => !task.isChecked).length;
    return (
        <section className={style.taskCounter}>
            <div className={style.taskCounterSectionAll}>
                <input
                    className={style.taskCounterSectionCheckbox}
                    type="checkbox"
                    checked={isAllTasksVisible}
                    onChange={() => handleToggleView(false)}
                />
                <Tooltip content={`Completed: ${completed}\nUncompleted: ${unCompleted}`}>
                    <h3 className={style.taskCounterAll}> All Tasks: {tasks.length} </h3>
                </Tooltip>
            </div>
            <div className={style.taskCounterSectionCompleted}>
                <input
                    className={style.taskCounterSectionCheckbox}
                    type="checkbox"
                    checked={!isAllTasksVisible}
                    onChange={() => handleToggleView(true)}
                />
                <h3 className={style.taskCounterCompleted}> Completed: {tasks.filter((task) => task.isChecked).length} </h3>
            </div>
        </section>
    );
};
