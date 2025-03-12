import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './styles/globals.css';
import { Provider } from './provider.tsx';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider>
                <App />
            </Provider>
        </BrowserRouter>
    </React.StrictMode>
);
