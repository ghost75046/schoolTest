import React, {useEffect, useState} from 'react';
import './CountdownTimer.css';

type CountdownTimerProps = {
    initialTime: number;
    onComplete?: () => void;
};

const CountdownTimer: React.FC<CountdownTimerProps> = ({initialTime, onComplete}) => {
    const localStorageKey = 'countdownTimerStartTime';
    const remainingTimeKey = 'countdownTimerRemainingTime';

    const calculateRemainingTime = (): number => {
        const savedStartTime = localStorage.getItem(localStorageKey);
        const savedRemainingTime = localStorage.getItem(remainingTimeKey);

        if (savedStartTime && savedRemainingTime) {
            const startTime = parseInt(savedStartTime, 10);
            const remainingTime = parseInt(savedRemainingTime, 10);
            const currentTime = Math.floor(Date.now() / 1000);
            const elapsedTime = currentTime - startTime;
            const newRemainingTime = remainingTime - elapsedTime;
            return newRemainingTime > 0 ? newRemainingTime : 0;
        }
        return initialTime;
    };

    const [timeLeft, setTimeLeft] = useState<number>(calculateRemainingTime);

    useEffect(() => {
        const startTime = Math.floor(Date.now() / 1000);
        localStorage.setItem(localStorageKey, startTime.toString());
        localStorage.setItem(remainingTimeKey, timeLeft.toString());

        if (timeLeft > 0) {
            const timerId = setInterval(() => {
                setTimeLeft((prevTime) => {
                    const newTime = prevTime - 1;
                    localStorage.setItem(remainingTimeKey, newTime.toString());
                    return newTime;
                });
            }, 1000);

            return () => clearInterval(timerId);
        } else if (timeLeft === 0) {

            if (onComplete) {
                onComplete();
            }
            localStorage.removeItem(localStorageKey);
            localStorage.removeItem(remainingTimeKey);
        }
    }, [timeLeft, onComplete]);

    const formatTime = (time: number) => (time < 10 ? `0${time}` : time);

    const minutes = Math.floor((timeLeft % 3600) / 60);
    const seconds = timeLeft % 60;

    return (
        <div className="timer">
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