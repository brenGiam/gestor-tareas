'use client'

import { createContext, useState, useContext, useEffect } from 'react';

// Creamos el contexto
const UserContext = createContext();

// Hook personalizado para facilitar el uso del contexto
export const useUser = () => useContext(UserContext);

// Proveedor del contexto
export const UserProvider = ({ children }) => {
    // Estado para almacenar la información del usuario
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Al montar el componente, verificar si hay un usuario en localStorage (para migración)
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
            setIsAuthenticated(true);
        }
    }, []);

    // Guardar los cambios del usuario en localStorage cuando se actualiza
    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        }
    }, [user]);

    // Función para iniciar sesión
    const login = (userData) => {
        setUser(userData);
        setIsAuthenticated(true);
    };

    // Función para cerrar sesión
    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem('user'); // Limpiar el usuario en localStorage
    };

    // Valores que expondremos en el contexto
    const value = {
        user,
        isAuthenticated,
        login,
        logout
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};
