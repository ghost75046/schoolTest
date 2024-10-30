import {observable} from "mobx";
import questionsStore from "./questionsStore";







const techStore = observable({
    currentQuestionId:0,
    currentQuestionIdIncrement() {
        if(techStore.currentQuestionId<questionsStore.length-1) {
            techStore.currentQuestionId++
        }

    },
    currentQuestionIdDecrement() {
        if(techStore.currentQuestionId>0) {
            techStore.currentQuestionId--
        }

    }
})


export default techStore






