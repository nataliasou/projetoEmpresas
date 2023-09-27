import Cookies from 'js-cookie';

import { Api } from '../axios-config';

interface IAuth {
    accessToken: string;
}

const auth = async (email: string, senha: string): Promise<IAuth | Error> => {
    try {
        const dados = {
            email: email,
            senha: senha,
        };

        const response = await Api.post<IAuth>('/auth', dados);

        if (response.status >= 200) {
            const accessToken = response.data.accessToken;
            Cookies.set('APP_ACCESS_TOKEN', accessToken, { secure: true });
            return response.data;
        }

        if (response.status === 404) {
            return new Error('Usuário não encontrado.');
        }

        return new Error('Erro de autenticação.');
    } catch (error) {
        console.error(error);
        return new Error((error as { message: string }).message || 'Erro de autenticação.');
    }
};


export const AuthService = {
    auth,
};