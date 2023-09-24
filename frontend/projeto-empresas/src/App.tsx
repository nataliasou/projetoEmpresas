import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes';
import { ThemeProvider } from '@mui/material';
import { LightTheme } from './shared/themes';
import { MenuLateral } from './shared/components';
import { DrawerProvider } from './shared/contexts';

export const App = () => {
    return (
        <ThemeProvider theme={LightTheme}>
            <DrawerProvider>
                <BrowserRouter>
                    <MenuLateral>
                        <AppRoutes />
                    </MenuLateral>
                </BrowserRouter>
            </DrawerProvider>
        </ThemeProvider>
    );
};
