import React from "react";
import questionsStore from "../store/questionsStore";


// Функция для отправки данных на сервер
export const submitAnswers = async () => {
    const answers = questionsStore.questions.map((question) => ({
        id: question.id,
        answer: question.answer,
    }));

    try {
        const response = await fetch("https://webhook.site/3a267249-f96d-4329-88d0-710749174d62", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            mode: "no-cors",
            body: JSON.stringify({answers}),
        });

        if (response.ok) {
            console.log("Ответы успешно отправлены");

            alert("Ответы успешно отправлены");
        } else {
            console.error("Ошибка отправки ответов:", response.statusText);
            alert("Ошибка отправки ответов");
        }
    } catch (error) {
        console.error("Внутренняя ошибка", error);
        alert("Внутренняя ошибка");
    }
};

const SubmitAnswers: React.FC = () => {
    return (
        <button onClick={submitAnswers}>отправить ответы</button>
    );
};

export default SubmitAnswers;