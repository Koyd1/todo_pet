import React, {useCallback, useState} from "react";
import styles from './index.module.scss';

interface InputPlusProps {
    onAdd: (title: string) => void;
}

export const InputPlus: React.FC<InputPlusProps> = ({onAdd}) => {
    const [inputValue, setInputValue] = useState('');

    const addTask = useCallback(() => {
        onAdd(inputValue);
        setInputValue('');
    }, [inputValue, onAdd]);

    return (
        <div className={styles.inputPlus}>
            <input
                className={styles.inputPlusValue}
                placeholder='Type here...'
                type="text"
                value={inputValue}
                onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                        addTask();
                    }
                }}
                onChange={(event) => {
                    setInputValue(event.target.value);
                }}
            />
            <button
                onClick={addTask}
                aria-label="Add"
                className={styles.inputBtn}
            ></button>
        </div>
    );
};
