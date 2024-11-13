import React from 'react';

const ClearStorageButton: React.FC = () => {
    const clearLocalStorage = () => {
        localStorage.clear();
    };
    return (
        <button onClick={clearLocalStorage}>Очистить localStorage</button>
    );
};

export default ClearStorageButton;