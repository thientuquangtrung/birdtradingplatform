import { Navigate } from 'react-router-dom';

function CheckAuth({ children }) {
    // if (!currentUser) {
    //     return <Navigate to="/login" />;
    // }

    return <>{children}</>;
}

export default CheckAuth;
