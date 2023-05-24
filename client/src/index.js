import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import GlobalStyles from './components/GlobalStyles';
import { SnackbarProvider, closeSnackbar } from 'notistack';
import { Clear } from '@mui/icons-material';
import { AuthContextProvider } from './contexts/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <GlobalStyles>
            <SnackbarProvider
                preventDuplicate
                autoHideDuration={3000}
                action={(snackbarId) => <Clear color="white" onClick={() => closeSnackbar(snackbarId)} />}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <AuthContextProvider>
                    <App />
                </AuthContextProvider>
            </SnackbarProvider>
        </GlobalStyles>
    </React.StrictMode>,
);
