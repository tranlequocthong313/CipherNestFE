import { Theme } from '@mui/material';

export interface ITheme {
    theme: Theme;
    mode: 'light' | 'dark'; 
    handleModeChange: (newMode: 'light' | 'dark') => void; 
}
