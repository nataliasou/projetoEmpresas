import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes';
import { ThemeProvider } from '@mui/material';
import { LightTheme } from './shared/themes';
import { MenuLateral, Login } from './shared/components';
import { AuthProvider, DrawerProvider } from './shared/contexts';



export const App = () => {
    return (
        <AuthProvider>
            <ThemeProvider theme={LightTheme}>

                <Login>

                    <DrawerProvider>
                        <BrowserRouter>
                            <MenuLateral>
                                <AppRoutes />
                            </MenuLateral>
                        </BrowserRouter>
                    </DrawerProvider>
                    
                </Login>
            </ThemeProvider>
        </AuthProvider>
    );
};
