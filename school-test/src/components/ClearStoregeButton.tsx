import React from 'react';
import questionsStore from '../store/questionsStore';

const ClearStorageButton: React.FC = () => {
    const clearLocalStorage = () => {
        localStorage.clear(); // Очищает весь localStorage
    };

    return (
        <button onClick={clearLocalStorage}>Очистить localStorage</button>
    );
};

export default ClearStorageButton;