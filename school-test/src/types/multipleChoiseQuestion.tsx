import React, {useState, useEffect} from 'react';
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

const MultipleChoiceQuestion: React.FC<MultipleChoiceQuestionProps> = ({options}) => {
    const questionId = techStore.currentQuestionId;
    const localStorageKey = `multipleChoiceAnswer_${questionId}`;

    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);


    useEffect(() => {
        const savedValue = localStorage.getItem(localStorageKey);
        if (savedValue) {
            setSelectedOptions(JSON.parse(savedValue));
        }
    }, [localStorageKey]);

    const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSelectedOptions((prev) => {
            const newSelectedOptions = prev.includes(value)
                ? prev.filter(option => option !== value)
                : [...prev, value];
            localStorage.setItem(localStorageKey, JSON.stringify(newSelectedOptions));
            return newSelectedOptions;
        });
    };


    useEffect(() => {
        questionsStore.questions[questionId].answer = selectedOptions;
    }, [selectedOptions, questionId]);

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