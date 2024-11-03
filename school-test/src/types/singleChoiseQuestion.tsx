import React, { useState, useEffect } from 'react';
import questionsStore from "../store/questionsStore";
import techStore from "../store/techStore";
import './singleChoiseQuestion.css';

type Option = {
    value: string;
    label: string;
};

type SingleChoiseQuestionProps = {
    options: Option[];
};

const SingleChoiseQuestion: React.FC<SingleChoiseQuestionProps> = ({ options }) => {
    const questionId = techStore.currentQuestionId; // Получаем текущий идентификатор вопроса
    const localStorageKey = `singleChoiceAnswer_${questionId}`; // Ключ для хранения в localStorage

    // Инициализация состояния с загрузкой из localStorage
    const [selectedOption, setSelectedOption] = useState<string>(() => {
        const savedValue = localStorage.getItem(localStorageKey);
        return savedValue ? savedValue : ''; // Если есть сохранённое значение, используем его
    });

    const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSelectedOption(value);

        // Сохраняем выбранный ответ в localStorage
        localStorage.setItem(localStorageKey, value);

        // Обновляем хранилище, записывая выбранный ответ в массив
        questionsStore[questionId].answer = [value]; // Записываем выбранный ответ как нулевой элемент массива
    };

    return (
        <div className='singleChoiseQuestion'>
            {options.map((option) => (
                <label className='custom-radio' key={option.value}>
                    <input
                        type="radio"
                        value={option.value}
                        checked={selectedOption === option.value}
                        onChange={handleOptionChange}
                    />
                    {option.label}
                </label>
            ))}
        </div>
    );
};

export default SingleChoiseQuestion;