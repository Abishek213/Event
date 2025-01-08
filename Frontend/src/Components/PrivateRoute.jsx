import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Element, requiredRole }) => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('role'); // Changed to match Login.jsx storage key

    if (!token) {
        return <Navigate to="/loginsignup" />;
    }

    if (requiredRole && requiredRole !== userRole) {
        // Redirect to appropriate dashboard based on actual role
        if (userRole === 'Admin') {
            return <Navigate to="/admindb" />;
        } else if (userRole === 'Organizer') {
            return <Navigate to="/orgdb" />;
        } else if (userRole === 'User') {
            return <Navigate to="/userdb" />;
        }
        return <Navigate to="/" />;
    }

    return <Element />;
};

export default PrivateRoute;