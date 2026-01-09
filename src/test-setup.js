import '@testing-library/jest-dom';

// Mock localStorage for Node environment and happy-dom if incomplete
if (typeof localStorage === 'undefined' || typeof localStorage.getItem !== 'function') {
    global.localStorage = {
        getItem: () => null,
        setItem: () => { },
        removeItem: () => { },
        clear: () => { },
    };
}
