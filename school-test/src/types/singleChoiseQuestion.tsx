import React, { useState } from 'react';
import questionsStore from "../store/questionsStore";
import techStore from "../store/techStore";
import './singleChoiseQuestion.css'
type Option = {
    value: string;
    label: string;
};

type SingleChoiseQuestionProps = {
    options: Option[];
};

const SingleChoiseQuestion: React.FC<SingleChoiseQuestionProps> = ({ options }) => {
    const [selectedOption, setSelectedOption] = useState<string>('');

    const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedOption(event.target.value);

    };
    questionsStore[techStore.currentQuestionId].answer = selectedOption

    return (
        <div className='singleChoiseQuestion'>
            {options.map((option) => (
                <label key={option.value}>
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