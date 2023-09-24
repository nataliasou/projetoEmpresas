import { Routes, Route, Navigate } from 'react-router-dom';
import { Principal } from '../pages';

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/inicio" element={<Principal />} />
            <Route path="*" element={<Navigate to="/inicio" />} />
        </Routes>
    );
};