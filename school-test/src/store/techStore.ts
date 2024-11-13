import {makeAutoObservable} from "mobx";
import questionsStore from "./questionsStore";
import SubmitAnswers, {submitAnswers} from "../components/SubmitAnswers";

const techStore = {
    currentQuestionId: 0,

    currentQuestionIdIncrement() {
        // Проверка: questionsStore.questions должен существовать и быть массивом
        if (
            Array.isArray(questionsStore.questions) &&
            questionsStore.questions.length > 0 &&
            techStore.currentQuestionId < questionsStore.questions.length
        ) {
            questionsStore.questions[techStore.currentQuestionId].isAnswered = 1;
            techStore.currentQuestionId++;
            console.log('сейчас вопрос номер'+techStore.currentQuestionId)
            console.log(questionsStore.questions.map((question) => ({
                id: question.id,
                answer: question.answer,
            })))
        }
    },

    currentQuestionIdDecrement() {
        if (techStore.currentQuestionId > 0) {
            techStore.currentQuestionId--;
        }
    }
};

makeAutoObservable(techStore);
export default techStore;