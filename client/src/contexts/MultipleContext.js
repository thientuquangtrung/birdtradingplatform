import { SnackbarProvider, closeSnackbar } from 'notistack';
import { Clear } from '@mui/icons-material';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { AuthContextProvider } from './AuthContext';
import { ChatContextProvider } from './ChatContext';
import { NotificationContextProvider } from './NotificationContext';
import { SocketContextProvider } from './SocketContext';
import { ThemeProvider, createTheme } from '@mui/material/styles';
// import { CssVarsProvider, extendTheme } from '@mui/joy/styles';

const initialOptions = {
    clientId: 'AYS0RfVsCpY9LTWg10jrbL0GTS-XMGZEe0MRuuY_AKY1NEMLyvtmA38i5fo7bDRKFVTeMe381eaK17kP',
    currency: 'USD',
    intent: 'capture',
};

const theme = createTheme({
    palette: {
        primary: {
            main: '#43a99b',
        },
        secondary: {
            main: '#a94351',
        },
    },
});

function MultipleContext({ children }) {
    return (
        // <ThemeProvider theme={theme}>
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
                        <SocketContextProvider>
                            <NotificationContextProvider>
                                <ChatContextProvider>{children}</ChatContextProvider>
                            </NotificationContextProvider>
                        </SocketContextProvider>
                    </PayPalScriptProvider>
                </AuthContextProvider>
            </SnackbarProvider>
        // </ThemeProvider>
    );
}

export default MultipleContext;
