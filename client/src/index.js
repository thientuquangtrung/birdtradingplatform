import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import GlobalStyles from './components/GlobalStyles';
import MultipleContext from './contexts/MultipleContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <GlobalStyles>
            <MultipleContext>
                <App />
            </MultipleContext>
        </GlobalStyles>
    </React.StrictMode>,
);
