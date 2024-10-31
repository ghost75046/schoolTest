import React from 'react';
import questionsStore from "../store/questionsStore";
import {observer} from "mobx-react-lite";
import techStore from "../store/techStore";
import SingleChoiseQuestion from "../types/singleChoiseQuestion";
import CountdownTimer from "../components/CountdownTimer";
import ProgressBar from "../components/ProgressBar";
import './QuizPage.css'
const MainPage = () => {



    return (
        <div className='quizPage'>
            <div className='testAndTimer'><p>Тестирование</p>
                <CountdownTimer initialTime={100}/>
            </div>

            <ProgressBar questions={questionsStore} currentQuestionId={techStore.currentQuestionId}/>


            <div className='questionTitle'>{'Вопрос номер ' + questionsStore[techStore.currentQuestionId].id + ': ' + questionsStore[techStore.currentQuestionId].title}</div>


            {(questionsStore[techStore.currentQuestionId].type == 'singleChoice') &&
                <SingleChoiseQuestion options={questionsStore[techStore.currentQuestionId].answers!}/>}

            {/*<SimpleAnswerForm />*/}
            {/*<input*/}
            {/*    type="text"*/}
            {/*    value={'textInput'}*/}
            {/*    //onChange={handleTextInputChange}*/}
            {/*    style={{marginLeft: '8px'}}*/}
            {/*/>*/}

            <div className='answerButtonDiv'>
                <button className='answerButton' onClick={techStore.currentQuestionIdIncrement}>Ответить</button>
            </div>
            <button onClick={techStore.currentQuestionIdDecrement}>предыдущий вопрос</button>

            <div>debug vibor{questionsStore[techStore.currentQuestionId].answer}</div>
        </div>


    )
}


export default observer(MainPage)