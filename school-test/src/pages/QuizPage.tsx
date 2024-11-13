import React, {useEffect} from 'react';
import questionsStore from "../store/questionsStore";
import {observer} from "mobx-react-lite";
import techStore from "../store/techStore";
import SingleChoiseQuestion from "../types/singleChoiseQuestion";
import CountdownTimer from "../components/CountdownTimer";
import ProgressBar from "../components/ProgressBar";
import './QuizPage.css';
import MultipleChoiceQuestion from "../types/multipleChoiseQuestion";
import ShortTextQuestion from "../types/ShortTextQuestion";
import LongTextQuestion from "../types/LongTextQuestion";


const MainPage = () => {

    const localStorageKey = 'currentQuestionId';


    useEffect(() => {
        const savedQuestionId = localStorage.getItem(localStorageKey);
        if (savedQuestionId) {
            techStore.currentQuestionId = parseInt(savedQuestionId, 10);
        }
    }, []);


    useEffect(() => {
        localStorage.setItem(localStorageKey, techStore.currentQuestionId.toString());
    }, [techStore.currentQuestionId]);


    const currentQuestion = questionsStore.questions[techStore.currentQuestionId];

    return (
        <div className='quizPage'>
            <div className='testAndTimer'>
                <p>Тестирование</p>
                <CountdownTimer initialTime={105}/>
            </div>

            <ProgressBar questions={questionsStore.questions} currentQuestionId={techStore.currentQuestionId}/>

            <div className='questionTitle'>
                {currentQuestion?.title}
            </div>

            {currentQuestion?.type === 'singleChoice' &&
                <SingleChoiseQuestion options={currentQuestion.answers || []} key={techStore.currentQuestionId}/>}
            {currentQuestion?.type === 'multipleChoice' &&
                <MultipleChoiceQuestion options={currentQuestion.answers || []} key={techStore.currentQuestionId}/>}
            {currentQuestion?.type === 'shortText' &&
                <ShortTextQuestion placeholder={'Введите ответ'} key={techStore.currentQuestionId}/>}
            {currentQuestion?.type === 'longText' &&
                <LongTextQuestion placeholder={'Введите ответ'} key={techStore.currentQuestionId}/>}

            <div className='answerButtonDiv'>
                <button className='answerButton' onClick={techStore.currentQuestionIdIncrement}>Ответить</button>


            </div>


        </div>
    );
}

export default observer(MainPage);