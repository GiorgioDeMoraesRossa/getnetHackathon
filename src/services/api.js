import axios from "axios";
import Swal from 'sweetalert2';

const api = axios.create({
    baseURL: 'https://getnet-hackathon-backend.azurewebsites.net'
});

export const authProvider = async () => {
    const bearerToken = localStorage.getItem('bearerToken');
    const refreshToken = localStorage.getItem('refreshToken');
    const timeout = localStorage.getItem('bearerTokenTimeout');

    if (!bearerToken || Date.now() >= timeout) {
        localStorage.removeItem('bearerToken');
        if (!refreshToken) {
            return false;
        } else {
            try {
            const { refresh_token, bearer_token, expires_in, company } = (await api.post('/refresh', {
                refresh_token: refreshToken
            })).data;
            const timeout = new Date(Date.now());
            timeout.setSeconds(timeout.getSeconds() + expires_in);

            localStorage.setItem('refreshToken', refresh_token);
            localStorage.setItem('bearerToken', bearer_token);
            localStorage.setItem('bearerTokenTimeout', Number(timeout))
            localStorage.setItem('cnpj', company);

            return true;
            } catch (err) {
                Swal.fire({
                    icon: 'error',
                    title: 'Erro na requisição',
                    text: err.response.data.error_description || err.response.data.error
                });
            }
        }
    }

    return true;
};

export const authenticate = async (cnpj, password) => {
    try {
        const { bearer_token, refresh_token, expires_in, company } = (await api.post('/authenticate', { cnpj, password })).data;

        const timeout = new Date(Date.now());

        timeout.setSeconds(timeout.getSeconds() + expires_in);
        localStorage.setItem('refreshToken', refresh_token);
        localStorage.setItem('bearerToken', bearer_token);
        localStorage.setItem('bearerTokenTimeout', Number(timeout))
        localStorage.setItem('cnpj', company);

        return true;
    } catch (err) {
        Swal.fire({
            icon: 'error',
            title: 'Erro na requisição',
            text: err.response.data.error_description || err.response.data.error
        });
        return false;
    }
};

export default api;