import React, { useEffect, useState } from 'react';
import './CountdownTimer.css';

type CountdownTimerProps = {
    initialTime: number; // начальное время в секундах
    onComplete?: () => void; // необязательная функция, вызываемая по завершении отсчета
};

const CountdownTimer: React.FC<CountdownTimerProps> = ({ initialTime, onComplete }) => {
    const localStorageKey = 'countdownTimerStartTime'; // Ключ для хранения времени начала таймера
    const remainingTimeKey = 'countdownTimerRemainingTime'; // Ключ для хранения оставшегося времени

    const calculateRemainingTime = (): number => {
        const savedStartTime = localStorage.getItem(localStorageKey);
        const savedRemainingTime = localStorage.getItem(remainingTimeKey);

        if (savedStartTime && savedRemainingTime) {
            const startTime = parseInt(savedStartTime, 10);
            const remainingTime = parseInt(savedRemainingTime, 10);
            const currentTime = Math.floor(Date.now() / 1000); // текущее время в секундах

            // Вычисляем оставшееся время
            const elapsedTime = currentTime - startTime;
            const newRemainingTime = remainingTime - elapsedTime;

            return newRemainingTime > 0 ? newRemainingTime : 0; // Возвращаем оставшееся время или 0, если время истекло
        }
        return initialTime; // Если нет сохранённого времени, возвращаем начальное
    };

    const [timeLeft, setTimeLeft] = useState<number>(calculateRemainingTime);

    useEffect(() => {
        // Сохраняем время старта
        const startTime = Math.floor(Date.now() / 1000);
        localStorage.setItem(localStorageKey, startTime.toString());
        localStorage.setItem(remainingTimeKey, timeLeft.toString()); // Сохраняем оставшееся время

        if (timeLeft > 0) {
            const timerId = setInterval(() => {
                setTimeLeft((prevTime) => {
                    const newTime = prevTime - 1;
                    localStorage.setItem(remainingTimeKey, newTime.toString()); // Обновляем оставшееся время
                    return newTime;
                });
            }, 1000);

            return () => {
                clearInterval(timerId);
            };
        } else if (timeLeft === 0 && onComplete) {
            onComplete();
            // Удаляем из localStorage при завершении
            localStorage.removeItem(localStorageKey);
            localStorage.removeItem(remainingTimeKey);
        }
    }, [timeLeft, onComplete]);

    // Вычисляем часы, минуты и секунды
    const hours = Math.floor(timeLeft / 3600);
    const minutes = Math.floor((timeLeft % 3600) / 60);
    const seconds = timeLeft % 60;

    // Функция для форматирования времени с ведущим нулем
    const formatTime = (time: number) => (time < 10 ? `0${time}` : time);

    return (
        <div className='timer'>
            {timeLeft > 0 ? (
                <h1>
                    {formatTime(minutes)}:{formatTime(seconds)}
                </h1>
            ) : (
                <h1>Время вышло!</h1>
            )}
        </div>
    );
};

export default CountdownTimer;