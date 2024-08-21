import React from 'react';
import { createRoot } from 'react-dom/client'; // createRoot를 가져옵니다.
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
);
