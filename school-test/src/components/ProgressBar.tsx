import React from 'react';
import './ProgressBar.css'

type Question = {
    id: number;
    isAnswered: number;
};

type ProgressBarProps = {
    questions: Question[];
    currentQuestionId: number;
};

const ProgressBar: React.FC<ProgressBarProps> = ({questions, currentQuestionId}) => {
    return (
        <div style={{display: 'flex', gap: '5px'}}>
            {questions.map((question, index) => {

                let backgroundColor = 'gray';

                if (index === currentQuestionId) {
                    backgroundColor = 'firebrick';
                } else if (question.isAnswered) {
                    backgroundColor = 'black';
                }

                return (
                    <div className='progressBarItem'
                         key={question.id}
                         style={{
                             width: '60px',
                             height: '10px',
                             backgroundColor,
                         }}
                    />
                );
            })}
        </div>
    );
};

export default ProgressBar;