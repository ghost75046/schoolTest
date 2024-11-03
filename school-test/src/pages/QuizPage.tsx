import React, { useEffect } from 'react';
import questionsStore from "../store/questionsStore";
import { observer } from "mobx-react-lite";
import techStore from "../store/techStore";
import SingleChoiseQuestion from "../types/singleChoiseQuestion";
import CountdownTimer from "../components/CountdownTimer";
import ProgressBar from "../components/ProgressBar";
import './QuizPage.css';
import MultipleChoiceQuestion from "../types/multipleChoiseQuestion";
import ShortTextQuestion from "../types/ShortTextQuestion";
import LongTextQuestion from "../types/LongTextQuestion";
import ClearStorageButton from "../components/ClearStoregeButton";

const MainPage = () => {
    // Ключ для localStorage
    const localStorageKey = 'currentQuestionId';

    // Загружаем текущий вопрос из localStorage при монтировании компонента
    useEffect(() => {
        const savedQuestionId = localStorage.getItem(localStorageKey);
        if (savedQuestionId) {
            techStore.currentQuestionId = parseInt(savedQuestionId, 10);
        }
    }, []);

    // Сохраняем текущий вопрос в localStorage при каждом изменении
    useEffect(() => {
        localStorage.setItem(localStorageKey, techStore.currentQuestionId.toString());
    }, [techStore.currentQuestionId]);

    return (
        <div className='quizPage'>
            <div className='testAndTimer'>
                <p>Тестирование</p>
                <CountdownTimer initialTime={100} />
            </div>

            <ProgressBar questions={questionsStore} currentQuestionId={techStore.currentQuestionId} />

            <div className='questionTitle'>
                {'Вопрос номер ' + questionsStore[techStore.currentQuestionId].id + ': ' + questionsStore[techStore.currentQuestionId].title}
            </div>

            {(questionsStore[techStore.currentQuestionId].type === 'singleChoice') &&
                <SingleChoiseQuestion options={questionsStore[techStore.currentQuestionId].answers!} />}
            {(questionsStore[techStore.currentQuestionId].type === 'multipleChoice') &&
                <MultipleChoiceQuestion options={questionsStore[techStore.currentQuestionId].answers!} />}
            {(questionsStore[techStore.currentQuestionId].type === 'shortText') &&
                <ShortTextQuestion placeholder={'vvedite'} />}
            {(questionsStore[techStore.currentQuestionId].type === 'longText') &&
                <LongTextQuestion placeholder={'vvedite'} />}

            <div className='answerButtonDiv'>
                <button className='answerButton' onClick={techStore.currentQuestionIdIncrement}>Ответить</button>
            </div>
            <button onClick={techStore.currentQuestionIdDecrement}>предыдущий вопрос</button>

            <div>debug vibor {questionsStore[techStore.currentQuestionId].answer}</div>
            <ClearStorageButton/>
        </div>
    );
}

export default observer(MainPage);