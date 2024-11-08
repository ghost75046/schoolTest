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
                // Определяем цвет блока
                let backgroundColor = 'gray'; // Цвет для не начатых вопросов

                if (index === currentQuestionId) {
                    backgroundColor = 'firebrick'; // Цвет текущего вопроса
                } else if (question.isAnswered) {
                    backgroundColor = 'black'; // Цвет для завершенных вопросов
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