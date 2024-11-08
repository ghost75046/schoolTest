import React, {useState, useEffect} from 'react';
import questionsStore from "../store/questionsStore";
import techStore from "../store/techStore";
import './MultipleChoiseQuestion.css';

type Option = {
    value: string;
    label: string;
};

type MultipleChoiceQuestionProps = {
    options: Option[];
};

const MultipleChoiceQuestion: React.FC<MultipleChoiceQuestionProps> = ({options}) => {
    const questionId = techStore.currentQuestionId; // Получаем текущий идентификатор вопроса
    const localStorageKey = `multipleChoiceAnswer_${questionId}`; // Ключ для хранения в localStorage

    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

    // Загружаем сохранённые значения из localStorage при монтировании компонента
    useEffect(() => {
        const savedValue = localStorage.getItem(localStorageKey);
        if (savedValue) {
            setSelectedOptions(JSON.parse(savedValue)); // Парсим сохранённые значения
        }
    }, [localStorageKey]);

    const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSelectedOptions((prev) => {
            const newSelectedOptions = prev.includes(value)
                ? prev.filter(option => option !== value) // Убираем значение, если оно уже выбрано
                : [...prev, value]; // Добавляем значение, если его нет в выбранных
            localStorage.setItem(localStorageKey, JSON.stringify(newSelectedOptions)); // Сохраняем в localStorage
            return newSelectedOptions; // Возвращаем обновлённый массив для состояния
        });
    };

    // Используйте useEffect для обновления хранилища только когда selectedOptions изменится
    useEffect(() => {
        questionsStore.questions[questionId].answer = selectedOptions; // Сохраняем выбранные опции в хранилище
    }, [selectedOptions, questionId]); // Обновляем только при изменении selectedOptions

    return (
        <div className='MultipleChoiceQuestion'>
            {options.map((option) => (
                <label className='custom-checkbox' key={option.value}>
                    <input
                        type="checkbox"
                        value={option.value}
                        checked={selectedOptions.includes(option.value)}
                        onChange={handleOptionChange}
                    />
                    {option.label}
                </label>
            ))}
        </div>
    );
};

export default MultipleChoiceQuestion;