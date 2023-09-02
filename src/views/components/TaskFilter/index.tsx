import React, {useState} from 'react';
import style from './index.module.scss';
import {useToDoStore} from "../../../data/stores/useToDoStore.ts";

interface TaskCounterProps {
    onToggleView: (showCompleted: boolean) => void;
}

export const TaskFilter: React.FC<TaskCounterProps> = ({onToggleView}) => {
    const [isAllTasksVisible, setIsAllTasksVisible] = useState<boolean>(true);
    const {tasks} = useToDoStore(state => state);

    const handleToggleView = (showCompleted: boolean) => {
        setIsAllTasksVisible(!showCompleted);
        onToggleView && onToggleView(showCompleted);
    };
    return (
        <section className={style.taskCounter}>
            <div className={style.taskCounterSection}>
                <input
                    className={style.taskCounterSectionCheckbox}
                    type="checkbox"
                    checked={isAllTasksVisible}
                    onChange={() => handleToggleView(false)}
                />
                <h3 className={style.taskCounterSectionValue}> All Tasks: {tasks.length} </h3>
            </div>
            <div className={style.taskCounterSection}>
                <input
                    className={style.taskCounterSectionCheckbox}
                    type="checkbox"
                    checked={!isAllTasksVisible}
                    onChange={() => handleToggleView(true)}
                />
                <h3 className={style.taskCounterSectionValue}> Completed: {tasks.filter((task) => (task.isChecked)).length} </h3>
            </div>
        </section>
    );
};
