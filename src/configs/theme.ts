import { createTheme } from "@mui/material/styles";

const getMatrixTheme = (mode: "light" | "dark" = "dark") =>
    createTheme({
        palette: {
            mode,
            primary: {
                main: "#00FF41", // Màu xanh lá cây neon
            },
            background: {
                default: mode === "dark" ? "#000000" : "#ffffff", // Nền đen cho dark mode, nền trắng cho light mode
                paper: mode === "dark" ? "#0A0A0A" : "#f5f5f5", // Nền xám nhạt cho paper
            },
            text: {
                primary: mode === "dark" ? "#00FF41" : "#000000", // Văn bản xanh lá cây neon cho dark mode, đen cho light mode
                secondary: mode === "dark" ? "#ffffff" : "#333333", // Văn bản phụ trắng cho dark mode, xám đậm cho light mode
            },
            action: {
                hover: mode === "dark" ? "#111111" : "#e0e0e0", // Màu nền khi hover
                selected: mode === "dark" ? "#333333" : "#c0c0c0", // Màu nền khi chọn
            },
        },
        typography: {
            fontFamily:
                '"Noto Sans Mono",SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace', // Font monospace giống Matrix
        },
    });

export default getMatrixTheme;
