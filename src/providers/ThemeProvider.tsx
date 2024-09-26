import React, { useState, useEffect, ReactNode } from 'react';
import getMatrixTheme from '../configs/theme';
import { ITheme, IThemeProviderProps } from '../interfaces/ITheme';
import ThemeContext from '../contexts/ThemeContext';

const ThemeProvider: React.FC<IThemeProviderProps> = ({ children }) => {
    const [mode, setMode] = useState<'light' | 'dark'>('dark');
    const [theme, setTheme] = useState(getMatrixTheme(mode));

    useEffect(() => {
        const savedMode = localStorage.getItem('themeMode') as 'light' | 'dark';
        if (savedMode) {
            setMode(savedMode);
        }
    }, []);

    useEffect(() => {
        setTheme(getMatrixTheme(mode));
    }, [mode]);

    const handleModeChange = (newMode: 'light' | 'dark') => {
        setMode(newMode);
        localStorage.setItem('themeMode', newMode); 
    };

    const value: ITheme = {
        mode,
        theme,
        handleModeChange,
    };

    return (
        <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
    );
};

export default ThemeProvider;
