import {makeAutoObservable, autorun, runInAction} from "mobx";


type Question = {
    id: number;
    title: string;
    type: string;
    answers?: { value: string; label: string }[];
    answer: string | string[];
    trueAnswer: number | string;
    isAnswered: number;
};

class QuestionsStore {
    questions: Question[] = [];

    constructor() {
        makeAutoObservable(this);
        this.questions = this.loadState();


        autorun(() => {
            this.saveState();
        });
    }


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
                answer: "",
                trueAnswer: 3,
                isAnswered: 0,
            },
            {
                id: 2,
                title: "2Question",
                type: "singleChoice",
                answers: [
                    {value: "1Answer", label: "1Answer"},
                    {value: "2Answer", label: "2Answer"},
                    {value: "3Answer", label: "3Answer"},
                ],
                answer: "",
                trueAnswer: 3,
                isAnswered: 0,
            },
            {
                id: 3,
                title: "3Question",
                type: "multipleChoice",
                answers: [
                    {value: "1Answer", label: "1Answer"},
                    {value: "2Answer", label: "2Answer"},
                    {value: "3Answer", label: "3Answer"},
                ],
                answer: "",
                trueAnswer: "3Answer",
                isAnswered: 0,
            },
            {
                id: 4,
                title: "4Question",
                type: "multipleChoice",
                answers: [
                    {value: "1Answer", label: "1Answer"},
                    {value: "2Answer", label: "2Answer"},
                    {value: "3Answer", label: "3Answer"},
                ],
                answer: "",
                trueAnswer: "3Answer",
                isAnswered: 0,
            },
            {
                id: 5,
                title: "3Question",
                type: "shortText",
                answer: "",
                trueAnswer: "3Answer",
                isAnswered: 0,
            },
            {
                id: 6,
                title: "34Question",
                type: "shortText",
                answer: "",
                trueAnswer: "3Answer",
                isAnswered: 0,
            },
            {
                id: 7,
                title: "5Question",
                type: "longText",
                answer: "",
                trueAnswer: "3Answer",
                isAnswered: 0,
            },
            {
                id: 8,
                title: "6Question",
                type: "longText",
                answer: "",
                trueAnswer: "3Answer",
                isAnswered: 0,
            }
        ];


        if (savedState) {
            try {
                const parsedState: {
                    id: number;
                    isAnswered: number;
                    answer: string | string[]
                }[] = JSON.parse(savedState);
                runInAction(() => {
                    parsedState.forEach((savedQuestion) => {
                        const question = initialQuestions.find((q) => q.id === savedQuestion.id);
                        if (question) {
                            question.isAnswered = savedQuestion.isAnswered;
                            question.answer = savedQuestion.answer;
                        }
                    });
                });
            } catch (error) {
                console.error("Failed to parse questions state from localStorage:", error);
            }
        }

        return initialQuestions;
    }


    setAnswer(id: number, value: string | string[]) {
        const question = this.questions.find((q) => q.id === id);
        if (question) {
            runInAction(() => {
                question.answer = value;
                question.isAnswered = 1;
            });
        }
    }


    setAnswered(id: number, value: number) {
        const question = this.questions.find((q) => q.id === id);
        if (question) {
            runInAction(() => {
                question.isAnswered = value;
            });
        }
    }


    saveState() {
        const stateToSave = this.questions.map(({id, isAnswered, answer}) => ({id, isAnswered, answer}));
        localStorage.setItem("questionsState", JSON.stringify(stateToSave));
    }
}

const questionsStore = new QuestionsStore();
export default questionsStore;