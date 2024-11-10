import {makeAutoObservable, autorun, runInAction} from "mobx";

// Определяем тип для вопроса
type Question = {
    id: number;
    title: string;
    type: string;
    answers?: { value: string; label: string }[];
    answer: string[];
    trueAnswer: number | string;
    isAnswered: number;
};

class QuestionsStore {
    questions: Question[] = [];

    constructor() {
        makeAutoObservable(this);
        this.questions = this.loadState(); // Загружаем начальное состояние из localStorage

        // Устанавливаем наблюдение, чтобы сохранять состояние при изменении isAnswered
        autorun(() => {
            this.saveState();
        });
    }

    //    Метод для загрузки состояния из localStorage
    loadState(): Question[] {
        const savedState = localStorage.getItem("questionsState");
        const initialQuestions: Question[] = [
            {
                id: 1,
                title: "1Question",
                type: "singleChoice",
                answers: [
                    {value: "1Answer", label: "1Answer"},
                    {value: "2Answer", label: "2Answer"},
                    {value: "3Answer", label: "3Answer"},
                ],
                answer: [""],
                trueAnswer: 3,
                isAnswered: 0,
            },
            {
                id: 2,
                title: "2Question",
                type: "multipleChoice",
                answers: [
                    {value: "1Answer", label: "1Answer"},
                    {value: "2Answer", label: "2Answer"},
                    {value: "3Answer", label: "3Answer"},
                ],
                answer: [""],
                trueAnswer: "3Answer",
                isAnswered: 0,
            },
            {
                id: 3,
                title: "3Question",
                type: "shortText",
                answer: [""],
                trueAnswer: "3Answer",
                isAnswered: 0,
            },
            {
                id: 4,
                title: "4Question",
                type: "longText",
                answer: [""],
                trueAnswer: "3Answer",
                isAnswered: 0,
            },
            {
                id: 5,
                title: "5Question",
                type: "longText",
                answer: [""],
                trueAnswer: "3Answer",
                isAnswered: 0,
            }
        ];

        if (savedState) {
            try {
                const parsedState: { id: number; isAnswered: number }[] = JSON.parse(savedState);
                runInAction(() => {
                    parsedState.forEach((savedQuestion) => {
                        const question = initialQuestions.find((q) => q.id === savedQuestion.id);
                        if (question) {
                            question.isAnswered = savedQuestion.isAnswered;
                        }
                    });
                });
            } catch (error) {
                console.error("Failed to parse questions state from localStorage:", error);
            }
        }

        return initialQuestions;
    }

    // Метод для обновления свойства isAnswered
    setAnswered(id: number, value: number) {
        const question = this.questions.find((q) => q.id === id);
        if (question) {
            question.isAnswered = value;
        }
    }

    // Метод для сохранения состояния в localStorage
    saveState() {
        const stateToSave = this.questions.map(({id, isAnswered}) => ({id, isAnswered}));
        localStorage.setItem("questionsState", JSON.stringify(stateToSave));
    }
}

const questionsStore = new QuestionsStore();
export default questionsStore;