import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './Auth';

export const MustLogin = ({ children }) => {
    const auth = useAuth();
    const location = useLocation();

    if (!auth.isLoggedIn) {
        return <Navigate to={`/sign-in?ref=${location.pathname}`} />;
    }
    return children
}
