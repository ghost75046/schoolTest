import React, {useState, useEffect} from 'react';
import questionsStore from "../store/questionsStore";
import techStore from "../store/techStore";
import './ShortQuestionQuestion.css';

type LongTextQuestionProps = {
    placeholder: string;
};

const LongTextQuestion: React.FC<LongTextQuestionProps> = ({placeholder}) => {
    const questionId = techStore.currentQuestionId;
    const localStorageKey = `question_${questionId}`;

    const [inputValue, setInputValue] = useState<string>('');

    useEffect(() => {

        const savedValue = localStorage.getItem(localStorageKey);
        if (savedValue) {
            setInputValue(savedValue);
        }
    }, [localStorageKey]);

    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = event.target.value;
        setInputValue(value);

        localStorage.setItem(localStorageKey, value);
    };


    useEffect(() => {
        questionsStore.questions[questionId].answer = [inputValue];
    }, [inputValue, questionId]);

    return (
        <div className='LongTextQuestion'>
            <textarea
                value={inputValue}
                onChange={handleInputChange}
                placeholder={placeholder}
                rows={4}
                style={{width: '100%', resize: 'vertical'}}


            />
        </div>
    );
};

export default LongTextQuestion;