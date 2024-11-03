import React, { useState, useEffect } from 'react';
import questionsStore from "../store/questionsStore";
import techStore from "../store/techStore";
import './ShortQuestionQuestion.css';

type LongTextQuestionProps = {
    placeholder: string; // Свойство для текста подсказки
};

const LongTextQuestion: React.FC<LongTextQuestionProps> = ({ placeholder }) => {
    const questionId = techStore.currentQuestionId; // Получаем текущий идентификатор вопроса
    const localStorageKey = `question_${questionId}`; // Ключ для хранения в localStorage

    const [inputValue, setInputValue] = useState<string>('');

    useEffect(() => {
        // Загружаем сохранённое значение из localStorage при монтировании компонента
        const savedValue = localStorage.getItem(localStorageKey);
        if (savedValue) {
            setInputValue(savedValue);
        }
    }, [localStorageKey]);

    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
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
        <div className='LongTextQuestion'>
            <textarea
                value={inputValue}
                onChange={handleInputChange}
                placeholder={placeholder} // Используем текст подсказки
                rows={4} // Задаем количество видимых строк
                style={{ width: '100%', resize: 'vertical' }} // Позволяем пользователю изменять размер по вертикали
            />
        </div>
    );
};

export default LongTextQuestion;