import { Routes, Route, Navigate } from 'react-router-dom';
import { Principal, DetalheEmpresas } from '../pages';
import { useDrawerContext } from '../shared/contexts';
import { useEffect } from 'react';

export const AppRoutes = () => {
    const { setDrawerOptions } = useDrawerContext();

    useEffect(() => {
        setDrawerOptions([
            {
                icon: 'home',
                path: '/pagina-inicial',
                label: 'Página Inicial',
            }
        ]);
    }, []);
    return (
        <Routes>
            <Route path="/empresas" element={<Principal />} />
            <Route path="/empresas/detalhe/:id" element={<DetalheEmpresas />} />
            <Route path="*" element={<Navigate to="/empresas" />} />
        </Routes>
    );
};