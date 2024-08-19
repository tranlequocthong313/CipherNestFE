import { createContext } from 'react'
import { ITheme } from '../interfaces/ITheme'
import getMatrixTheme from '../configs/theme';

const ThemeContext = createContext<ITheme>(
    {
        theme: getMatrixTheme(),
        mode: 'dark',
        handleModeChange: (newMode: 'light' | 'dark') => { },
    }
);

export default ThemeContext

