import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { AuthService } from '../services/api/auth/AuthService';

interface IAuthContextData {
    logout: () => void;
    isAuthenticated: boolean;
    login: (email: string, senha: string) => Promise<string | void>;
}

const AuthContext = createContext({} as IAuthContextData);

interface IAuthProviderProps {
    children: React.ReactNode;
}

export const AuthProvider: React.FC<IAuthProviderProps> = ({ children }) => {
    const [accessToken, setAccessToken] = useState<string>();


    const handleLogin = useCallback(async (email: string, senha: string) => {
        const result = await AuthService.auth(email, senha);
        if (result instanceof Error) {
            return result.message;
        } else {
            console.log(result.accessToken);
            setAccessToken(result.accessToken);
        }
    }, []);

    const handleLogout = useCallback(() => {
        
        setAccessToken(undefined);
    }, []);

    const isAuthenticated = useMemo(() => !!accessToken, [accessToken]);

    return (
        <AuthContext.Provider value={{ isAuthenticated, login: handleLogin, logout: handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
};


export const useAuthContext = () => useContext(AuthContext);