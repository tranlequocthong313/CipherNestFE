import { createTheme } from '@mui/material/styles';

const getMatrixTheme = (mode: 'light' | 'dark' = 'dark') =>
    createTheme({
        palette: {
            mode,
            primary: {
                main: '#00FF41', // Màu xanh lá cây neon
            },
            background: {
                default: mode === 'dark' ? '#000000' : '#ffffff', // Nền đen cho dark mode, nền trắng cho light mode
                paper: mode === 'dark' ? '#0A0A0A' : '#f5f5f5', // Nền xám nhạt cho paper
            },
            text: {
                primary: mode === 'dark' ? '#00FF41' : '#000000', // Văn bản xanh lá cây neon cho dark mode, đen cho light mode
                secondary: mode === 'dark' ? '#ffffff' : '#333333', // Văn bản phụ trắng cho dark mode, xám đậm cho light mode
            },
            action: {
                hover: '#A62E38'
            }
        },
        typography: {
            fontFamily: '"Courier New", Courier, monospace', // Font monospace giống Matrix
        },
    });

export default getMatrixTheme
