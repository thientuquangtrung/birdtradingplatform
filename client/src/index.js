import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import GlobalStyles from './components/GlobalStyles';
import { SnackbarProvider, closeSnackbar } from 'notistack';
import { Clear } from '@mui/icons-material';
import { AuthContextProvider } from './contexts/AuthContext';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

const initialOptions = {
    clientId: 'AYS0RfVsCpY9LTWg10jrbL0GTS-XMGZEe0MRuuY_AKY1NEMLyvtmA38i5fo7bDRKFVTeMe381eaK17kP',
    currency: 'USD',
    intent: 'capture',
};

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
                    horizontal: 'center',
                }}
            >
                <AuthContextProvider>
                    <PayPalScriptProvider options={initialOptions}>
                        <App />
                    </PayPalScriptProvider>
                </AuthContextProvider>
            </SnackbarProvider>
        </GlobalStyles>
    </React.StrictMode>,
);
