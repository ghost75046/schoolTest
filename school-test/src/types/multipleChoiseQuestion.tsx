import React, { useState, useEffect } from 'react';
import questionsStore from "../store/questionsStore";
import techStore from "../store/techStore";
import './MultipleChoiseQuestion.css';

type Option = {
    value: string;
    label: string;
};

type MultipleChoiceQuestionProps = {
    options: Option[];
};

const MultipleChoiceQuestion: React.FC<MultipleChoiceQuestionProps> = ({ options }) => {
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

    const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSelectedOptions((prev) =>
            prev.includes(value)
                ? prev.filter(option => option !== value)
                : [...prev, value]
        );
    };

    // Используйте useEffect для обновления хранилища только когда selectedOptions изменится
    useEffect(() => {
        questionsStore[techStore.currentQuestionId].answer = selectedOptions;
    }, [selectedOptions]); // Обновляем только при изменении selectedOptions

    return (
        <div className='MultipleChoiceQuestion'>
            {options.map((option) => (
                <label className='custom-checkbox' key={option.value}>
                    <input
                        type="checkbox"
                        value={option.value}
                        checked={selectedOptions.includes(option.value)}
                        onChange={handleOptionChange}
                    />
                    {option.label}
                </label>
            ))}
        </div>
    );
};

export default MultipleChoiceQuestion;