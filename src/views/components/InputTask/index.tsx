import React, { useEffect, useRef, useState } from "react";
import styles from './index.module.scss';

interface InputTaskProps {
    id: string;
    title: string;
    isChecked: boolean;
    onDone: (id: string, title: string) => void;
    onEdited: (id: string, value: string) => void;
    onRemoved: (id: string) => void;
}
export const InputTask: React.FC<InputTaskProps> = ({ id, title, isChecked, onDone, onEdited, onRemoved }) => {
    const [isEditMode, setIsEditMode] = useState<boolean>(false);
    const [value, setValue] = useState<string>(title);
    const editTitleInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {isEditMode && editTitleInputRef?.current?.focus()
    }, [isEditMode]);

    const handleEditModeSave = () => {
        onEdited(id, value);
        setIsEditMode(false);
    };

    return (
        <div className={styles.inputTask}>
            <label className={styles.inputTaskLabel}>
                <input
                    type="checkbox"
                    checked={isChecked}
                    disabled={isEditMode}
                    className={styles.inputTaskCheckbox}
                    onChange={() => onDone(id, value)
                    }
                />
                {
                    isEditMode ? (
                        <input
                            type="text"
                            className={styles.inputTaskTitleEdit}
                            value={value}
                            ref={editTitleInputRef}
                            onChange={(evt) => setValue(evt.target.value)}
                            onKeyDown={(evt) => {evt.key === 'Enter' && handleEditModeSave()
                            }}
                        />
                    ) : (
                        <h3 className={isChecked ? styles.checkedTitle : ''}>{title}</h3>
                    )
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
                    onClick={() => setIsEditMode(true)
                    }
                />
            )}
            <button
                aria-label='Remove'
                className={styles.inputTaskRemove}
                onClick={() => {
                    confirm('Are you sure?') && onRemoved(id);
                }}
            />
            </div>
    );
};