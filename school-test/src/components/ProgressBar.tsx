import React from 'react';

type Question = {
    id: number;
    isAnswered: boolean;
};

type ProgressBarProps = {
    questions: Question[];
    currentQuestionId: number;
};

const ProgressBar: React.FC<ProgressBarProps> = ({ questions, currentQuestionId }) => {
    return (
        <div style={{ display: 'flex', gap: '5px' }}>
            {questions.map((question, index) => {
                // Определяем цвет блока
                let backgroundColor = 'gray'; // Цвет для не начатых вопросов

                if (index === currentQuestionId) {
                    backgroundColor = 'red'; // Цвет текущего вопроса
                } else if (question.isAnswered) {
                    backgroundColor = 'black'; // Цвет для завершенных вопросов
                }

                return (
                    <div
                        key={question.id}
                        style={{
                            width: '20px',
                            height: '20px',
                            backgroundColor,
                        }}
                    />
                );
            })}
        </div>
    );
};

export default ProgressBar;