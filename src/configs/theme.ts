import { createTheme } from "@mui/material/styles";

const getMatrixTheme = (mode: "light" | "dark" = "dark") =>
    createTheme({
        palette: {
            mode,
            primary: {
                main: "#00FF41", 
            },
            background: {
                default: mode === "dark" ? "#000000" : "#ffffff", 
                paper: mode === "dark" ? "#0A0A0A" : "#f5f5f5", 
            },
            text: {
                primary: mode === "dark" ? "#00FF41" : "#000000", 
                secondary: mode === "dark" ? "#ffffff" : "#333333", 
            },
            action: {
                hover: mode === "dark" ? "#111111" : "#e0e0e0", 
                selected: mode === "dark" ? "#333333" : "#c0c0c0", 
            },
        },
        typography: {
            fontFamily:
                '"Noto Sans Mono",SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace', 
        },
    });

export default getMatrixTheme;
