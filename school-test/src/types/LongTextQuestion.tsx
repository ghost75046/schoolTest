import React, { useState, useEffect } from 'react';
import questionsStore from "../store/questionsStore";
import techStore from "../store/techStore";
import './ShortQuestionQuestion.css';

type LongTextQuestionProps = {
    placeholder: string; // Свойство для текста подсказки
};

const LongTextQuestion: React.FC<LongTextQuestionProps> = ({ placeholder }) => {
    const [inputValue, setInputValue] = useState<string>('');

    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInputValue(event.target.value);
    };

    // Используйте useEffect для обновления хранилища только когда inputValue изменится
    useEffect(() => {
        questionsStore[techStore.currentQuestionId].answer = [inputValue]; // Сохраняем введённый текст в виде массива
    }, [inputValue]); // Обновляем только при изменении inputValue

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