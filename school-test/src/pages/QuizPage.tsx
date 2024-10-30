import React from 'react';
import questionsStore from "../store/questionsStore";
import {observer} from "mobx-react-lite";
import techStore from "../store/techStore";
import SimpleAnswerForm from "../components/single";
import RadioButtonGroup from "../types/singleChoiseQuestion";
import SingleChoiseQuestion from "../types/singleChoiseQuestion";
import CountdownTimer from "../components/CountdownTimer";
import ProgressBar from "../components/ProgressBar";
const MainPage = () => {



    return (
        <div>
            school test
            <CountdownTimer initialTime={100}/>
            <div>прогрессбар</div>
            <ProgressBar questions={questionsStore} currentQuestionId={techStore.currentQuestionId}/>


            <div>{'Вопрос номер '+ questionsStore[techStore.currentQuestionId].id +': ' +questionsStore[techStore.currentQuestionId].title}</div>

            <button onClick={techStore.currentQuestionIdDecrement}>предыдущий вопрос</button>
            <button onClick={techStore.currentQuestionIdIncrement}>следующий вопрос</button>


            {(questionsStore[techStore.currentQuestionId].type == 'singleChoice') && <SingleChoiseQuestion options={questionsStore[techStore.currentQuestionId].answers!}/>}
            <div>vibor{questionsStore[techStore.currentQuestionId].answer}</div>
            {/*<SimpleAnswerForm />*/}
            {/*<input*/}
            {/*    type="text"*/}
            {/*    value={'textInput'}*/}
            {/*    //onChange={handleTextInputChange}*/}
            {/*    style={{marginLeft: '8px'}}*/}
            {/*/>*/}

        </div>


    )
}


export default observer(MainPage)