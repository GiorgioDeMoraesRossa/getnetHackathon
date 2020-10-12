import { useState } from 'react';
import { authProvider } from '../services/api';

const useAuthentication = () => {
    const [isAuthenticated, setAuthenticated] = useState(false);

    const authenticate = async () => {
        const auth = await authProvider();
        setAuthenticated(auth);
        return auth;
    };

    return [isAuthenticated, authenticate];
};

export default useAuthentication;