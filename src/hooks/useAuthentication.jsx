import { useState } from 'react';
import { authProvider, secureRequest } from '../services/api';

const useAuthentication = () => {
    const [isAuthenticated, setAuthenticated] = useState(false);

    const authenticate = async () => {
        const auth = await authProvider();
        setAuthenticated(auth);
        return auth;
    };

    const requester = secureRequest(authenticate);

    return [isAuthenticated, authenticate, requester];
};

export default useAuthentication;