import { IconButton, Icon, Box, Typography, useTheme, useMediaQuery } from '@mui/material';
import { useDrawerContext } from '../contexts';
import React from 'react';
interface ILayoutBaseProps {
    children: React.ReactNode;
    titulo: string;
    barraDeFerramentas?: React.ReactNode;
}


export const LayoutBase: React.FC<ILayoutBaseProps> = ({ children, titulo, barraDeFerramentas }) => {
    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));
    const mdDown = useMediaQuery(theme.breakpoints.down('md'));

    const { toggleDrawerOpen } = useDrawerContext();
    return (
        <Box height="100%" display="flex" flexDirection="column" gap={1}>
            <Box padding={1} display="flex" alignItems="center" height={theme.spacing(smDown ? 6 : mdDown ? 8 : 12)}>
                {smDown && (
                    <IconButton onClick={toggleDrawerOpen}>
                        <Icon>menu</Icon>
                    </IconButton>
                )}
                <Typography
                    whiteSpace="nowrap"
                    overflow="hidden"
                    textOverflow="ellipses"
                    variant={smDown ? 'h5' : mdDown ? 'h4' : 'h3'}
                >
                    {titulo}
                </Typography>
            </Box>
            {barraDeFerramentas && (
                <Box>
                    {barraDeFerramentas}
                </Box>
            )}

            <Box flex={1} overflow="auto">{children}</Box>


        </Box>
    );
};