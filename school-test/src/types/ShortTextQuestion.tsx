import React, { useState, useEffect } from 'react';
import questionsStore from "../store/questionsStore";
import techStore from "../store/techStore";
import './ShortQuestionQuestion.css';

type ShortTextQuestionProps = {
    placeholder: string; // Добавим свойство для текста подсказки
};

const ShortTextQuestion: React.FC<ShortTextQuestionProps> = ({ placeholder }) => {
    const [inputValue, setInputValue] = useState<string>('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    // Используйте useEffect для обновления хранилища только когда inputValue изменится
    useEffect(() => {
        questionsStore[techStore.currentQuestionId].answer = [inputValue]; // Сохраняем введённый текст в виде массива
    }, [inputValue]); // Обновляем только при изменении inputValue

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