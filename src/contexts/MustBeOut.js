import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './Auth';

export const MustBeOut = ({ children }) => {
    const auth = useAuth();

    if (auth.isLoggedIn) {
        return <Navigate to={`/dashboard`} />;
    }
    return children
}
