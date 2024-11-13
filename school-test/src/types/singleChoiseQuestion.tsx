import React, {useState} from 'react';
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

const SingleChoiseQuestion: React.FC<SingleChoiseQuestionProps> = ({options}) => {
    const questionId = techStore.currentQuestionId;
    const localStorageKey = `singleChoiceAnswer_${questionId}`;


    const [selectedOption, setSelectedOption] = useState<string>(() => {
        const savedValue = localStorage.getItem(localStorageKey);
        return savedValue ? savedValue : '';
    });

    const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSelectedOption(value);


        localStorage.setItem(localStorageKey, value);


        questionsStore.questions[questionId].answer = [value];
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