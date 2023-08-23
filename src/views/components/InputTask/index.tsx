import React, {useEffect, useRef, useState} from "react";
import styles from './index.module.scss';

interface inputTaskProps {
    id: string;
    title: string;
    onDone: (id: string) => void;
    onEdited: (id: string, value: string) => void;
    onRemoved: (id: string) => void;
}

export const InputTask: React.FC<inputTaskProps> = ({id, title, onDone, onEdited, onRemoved}) => {

    const [checked, setChecked] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [value, setValue] = useState(title);
    const editTitleInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isEditMode) {
            editTitleInputRef?.current?.focus();
        }
    }, [isEditMode]);


    return (
        <div className={styles.inputTask}>
            <label className={styles.inputTaskLabel}>
                <input type="checkbox"
                       checked={checked}
                       disabled={isEditMode}
                       className={styles.inputTaskCheckbox}
                       onChange={(event) => {
                           setChecked(event.target.checked);
                           if (event.target.checked) {
                               setTimeout(() => {
                                   onDone(id);
                               }, 300)

                           }
                       }}/>
                {
                    isEditMode ? (
                        <input type="text"
                               className={styles.inputTaskTitleEdit}
                               value={value}
                               ref={editTitleInputRef}
                               onChange={(evt) => {
                                   setValue(evt.target.value);
                               }}
                               onKeyDown={(evt) => {
                                   if (evt.key === 'Enter') {
                                       onEdited(id, value)
                                       setIsEditMode(false)
                                   }
                               }}
                        />
                    ) : <h3 className={title}> {title}</h3>
                }

            </label>
            {isEditMode ? (
                <button
                    aria-label='Save'
                    className={styles.inputTaskSave}
                    onClick={() => {
                        onEdited(id, value)
                        setIsEditMode(false)
                    }}
                />) : (
                <button
                    aria-label='Edid'
                    className={styles.inputTaskEdit}
                    onClick={() => {
                        setIsEditMode(true)
                    }}
                />
            )}
            <button
                aria-label='Remove'
                className={styles.inputTaskRemove}
                onClick={() => {
                    if (confirm('Are you sure?')) {
                        onRemoved(id);
                    }
                }}
            />
        </div>
    );
};

