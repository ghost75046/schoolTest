import React, {useState, useEffect} from 'react';
import questionsStore from "../store/questionsStore";
import techStore from "../store/techStore";
import './ShortQuestionQuestion.css';

type ShortTextQuestionProps = {
    placeholder: string;
};

const ShortTextQuestion: React.FC<ShortTextQuestionProps> = ({placeholder}) => {
    const questionId = techStore.currentQuestionId;
    const localStorageKey = `shortTextAnswer_${questionId}`;

    const [inputValue, setInputValue] = useState<string>('');


    useEffect(() => {
        const savedValue = localStorage.getItem(localStorageKey);
        if (savedValue) {
            setInputValue(savedValue);
        }
    }, [localStorageKey]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setInputValue(value);

        localStorage.setItem(localStorageKey, value);
    };


    useEffect(() => {
        questionsStore.questions[questionId].answer = [inputValue];
    }, [inputValue, questionId]);

    return (
        <div className='ShortTextQuestion'>
            <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder={placeholder}
            />
        </div>
    );
};

export default ShortTextQuestion;