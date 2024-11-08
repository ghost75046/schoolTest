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

    // Метод для загрузки состояния из localStorage
    loadState(): Question[] {
        const savedState = localStorage.getItem("questionsState");
        const initialQuestions: Question[] = [
            {
                id: 1,
                title: "1Kak zovut koshky",
                type: "singleChoice",
                answers: [
                    {value: "businka", label: "businka"},
                    {value: "murmuletka", label: "murmuletka"},
                    {value: "Option 3", label: "Option 3"},
                ],
                answer: [""],
                trueAnswer: 3,
                isAnswered: 0,
            },
            {
                id: 2,
                title: "2Who is Delya",
                type: "multipleChoice",
                answers: [
                    {value: "businka2", label: "businka2"},
                    {value: "murmuletka2", label: "murmuletka2"},
                    {value: "Option 32", label: "Option 32"},
                ],
                answer: [""],
                trueAnswer: "Businka",
                isAnswered: 0,
            },
            {
                id: 3,
                title: "3Who is Delya",
                type: "shortText",
                answer: [""],
                trueAnswer: "Businka",
                isAnswered: 0,
            },
            {
                id: 4,
                title: "4Who is Delya",
                type: "longText",
                answer: [""],
                trueAnswer: "Businka",
                isAnswered: 0,
            },
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