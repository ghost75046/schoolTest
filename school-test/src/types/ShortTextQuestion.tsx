import React, { useState, useEffect } from 'react';
import questionsStore from "../store/questionsStore";
import techStore from "../store/techStore";
import './ShortQuestionQuestion.css';

type ShortTextQuestionProps = {
    placeholder: string; // Свойство для текста подсказки
};

const ShortTextQuestion: React.FC<ShortTextQuestionProps> = ({ placeholder }) => {
    const questionId = techStore.currentQuestionId; // Получаем текущий идентификатор вопроса
    const localStorageKey = `shortTextAnswer_${questionId}`; // Ключ для хранения в localStorage

    const [inputValue, setInputValue] = useState<string>('');

    // Загружаем сохранённое значение из localStorage при монтировании компонента
    useEffect(() => {
        const savedValue = localStorage.getItem(localStorageKey);
        if (savedValue) {
            setInputValue(savedValue);
        }
    }, [localStorageKey]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setInputValue(value);
        // Сохраняем текущее значение в localStorage
        localStorage.setItem(localStorageKey, value);
    };

    // Используйте useEffect для обновления хранилища только когда inputValue изменится
    useEffect(() => {
        questionsStore[questionId].answer = [inputValue]; // Сохраняем введённый текст в виде массива
    }, [inputValue, questionId]); // Обновляем только при изменении inputValue

    return (
        <div className='ShortTextQuestion'>
            <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder={placeholder} // Используем текст подсказки
            />
        </div>
    );
};

export default ShortTextQuestion;