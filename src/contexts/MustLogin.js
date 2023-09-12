import { Navigate } from 'react-router-dom';
import { useAuth } from './Auth';

export const MustLogin = ({ children }) => {
    const auth = useAuth();

    if (!window.localStorage.getItem('username')) {
        return <Navigate to={`/sign-in`} />;
    }
    return children
}
