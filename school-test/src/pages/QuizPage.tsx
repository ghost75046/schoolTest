import React from 'react';
import questionsStore from "../store/questionsStore";
import {observer} from "mobx-react-lite";
import techStore from "../store/techStore";
import SimpleAnswerForm from "../components/single";
const MainPage = () => {



    return (
        <div>
            school test
            <div>прогрессбар</div>

            <div>таймер</div>
            <div>{'Вопрос номер '+ questionsStore[techStore.currentQuestionId].id +': ' +questionsStore[techStore.currentQuestionId].title}</div>

            <button onClick={techStore.currentQuestionIdDecrement}>предыдущий вопрос</button>
            <button onClick={techStore.currentQuestionIdIncrement}>следующий вопрос</button>

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