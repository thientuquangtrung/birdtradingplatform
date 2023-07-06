import { SnackbarProvider, closeSnackbar } from 'notistack';
import { Clear } from '@mui/icons-material';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { AuthContextProvider } from './AuthContext';
import { ChatContextProvider } from './ChatContext';
import { NotificationContextProvider } from './NotificationContext';
import { SocketContextProvider } from './SocketContext';

const initialOptions = {
    clientId: 'AYS0RfVsCpY9LTWg10jrbL0GTS-XMGZEe0MRuuY_AKY1NEMLyvtmA38i5fo7bDRKFVTeMe381eaK17kP',
    currency: 'USD',
    intent: 'capture',
};

function MultipleContext({ children }) {
    return (
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
    );
}

export default MultipleContext;
