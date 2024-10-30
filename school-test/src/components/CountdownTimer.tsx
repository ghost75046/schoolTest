import React, { useEffect, useState } from 'react';

type CountdownTimerProps = {
    initialTime: number; // начальное время в секундах
    onComplete?: () => void; // необязательная функция, вызываемая по завершении отсчета
};

const CountdownTimer: React.FC<CountdownTimerProps> = ({ initialTime, onComplete }) => {
    const [timeLeft, setTimeLeft] = useState(initialTime);

    useEffect(() => {
        if (timeLeft > 0) {
            const timerId = setInterval(() => {
                setTimeLeft((prevTime) => prevTime - 1);
            }, 1000);

            return () => clearInterval(timerId);
        } else if (timeLeft === 0 && onComplete) {
            onComplete();
        }
    }, [timeLeft, onComplete]);

    // Вычисляем часы, минуты и секунды
    const hours = Math.floor(timeLeft / 3600);
    const minutes = Math.floor((timeLeft % 3600) / 60);
    const seconds = timeLeft % 60;

    // Функция для форматирования времени с ведущим нулем
    const formatTime = (time: number) => (time < 10 ? `0${time}` : time);

    return (
        <div>
            {timeLeft > 0 ? (
                <h1>
                    Осталось времени: {formatTime(hours)}:{formatTime(minutes)}:{formatTime(seconds)}
                </h1>
            ) : (
                <h1>Время вышло!</h1>
            )}
        </div>
    );
};

export default CountdownTimer;