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
                const {
                    refresh_token,
                    bearer_token,
                    expires_in,
                    company
                } = (await api.post('/refresh', {
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
        const {
            bearer_token,
            refresh_token,
            expires_in,
            company
        } = (await api.post('/authenticate', {
            cnpj,
            password
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
        return false;
    }
};

export const secureRequest = authenticator => {
    const requester = async (method, uri, ...params) => {
        try {
            await authenticator();

            const headers = {
                Authorization: `Bearer ${localStorage.getItem('bearerToken')}`
            };

            const response = (await api[method](uri, {
                ...params,
                headers
            })).data;
            return response;
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Erro na requisição',
                text: err.response.data.error_description || err.response.data.error
            });
            return null;
        }
    }

    return {
        async get(uri, ...params) {
            return await requester('get', uri, ...params);
        },

        async post(uri, data, ...params) {
            return await requester('post', uri, data, ...params);
        },

        async put(uri, data, ...params) {
            return await requester('put', uri, data, ...params);
        }
    }
};

export default api;