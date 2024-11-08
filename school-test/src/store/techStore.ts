import {makeAutoObservable} from "mobx";
import questionsStore from "./questionsStore";

const techStore = {
    currentQuestionId: 0,

    currentQuestionIdIncrement() {
        // Проверка: questionsStore.questions должен существовать и быть массивом
        if (
            Array.isArray(questionsStore.questions) &&
            questionsStore.questions.length > 0 &&
            techStore.currentQuestionId < questionsStore.questions.length - 1
        ) {
            questionsStore.questions[techStore.currentQuestionId].isAnswered = 1;
            techStore.currentQuestionId++;
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