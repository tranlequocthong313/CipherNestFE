import { Theme } from "@mui/material";
import { ReactNode } from "react";

export interface ITheme {
    theme: Theme;
    mode: "light" | "dark";
    handleModeChange: (newMode: "light" | "dark") => void;
}

export interface IThemeProviderProps {
    children: ReactNode;
}
