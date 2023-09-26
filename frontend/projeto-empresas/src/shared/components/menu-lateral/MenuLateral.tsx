import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import { Avatar, Divider, Drawer, useTheme, ListItemButton, useMediaQuery } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { Box } from '@mui/system';
import { useAuthContext, useDrawerContext } from '../../contexts';
interface IAppThemeProviderProps {
    children: React.ReactNode
}

export const MenuLateral: React.FC<IAppThemeProviderProps> = ({ children }) => {
    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));
    
    const { isDrawerOpen, toggleDrawerOpen } = useDrawerContext();

    const { logout } = useAuthContext();
    return (
        <>
            <Drawer open={isDrawerOpen} variant={smDown ? 'temporary' : 'permanent'} onClose={ toggleDrawerOpen }>
                <Box width={theme.spacing(28)} height="100%" display="flex" flexDirection="column">
                    <Box width="50%" marginTop="20%" marginLeft={theme.spacing(7)} display="flex" alignItems="center" justifyContent="center">
                        <Avatar
                            sx={{ height: theme.spacing(12), width: theme.spacing(12) }}
                            src="/broken-image.jpg" />
                    </Box>

                    <Divider />
                    <Box flex={1}>
                        <ListItemButton component="a" onClick={logout}>
                            <IconButton aria-label="comment">
                                <LogoutIcon />
                            </IconButton>
                            <ListItemText primary="Sair" />
                        </ListItemButton>
                    </Box>

                </Box>
            </Drawer>
            <Box height="100vh" marginLeft={smDown ? 0 : theme.spacing(28)}>
                {children}
            </Box>
        </>
    );
};