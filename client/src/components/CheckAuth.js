import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';

function CheckAuth({ children, role = [] }) {
    const { currentUser } = useContext(AuthContext);

    if (!currentUser || !role.includes(currentUser.role)) {
        return <Navigate to="/login" />;
    }

    return <>{children}</>;
}

export default CheckAuth;
