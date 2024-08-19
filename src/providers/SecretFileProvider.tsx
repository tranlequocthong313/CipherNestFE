import React, { useState, useEffect, ReactNode, useReducer } from "react";
import getMatrixTheme from "../configs/theme";
import { ITheme, IThemeProviderProps } from "../interfaces/ITheme";
import ThemeContext from "../contexts/ThemeContext";
import secretFileReducer, {
    initialSecretFilesState,
} from "../reducers/secretFileReducer";
import {
    SecretFileContext,
    SecretFileDispatchContext,
} from "../contexts/SecretFileContext";

const SecretFileProvider: React.FC<IThemeProviderProps> = ({ children }) => {
    const [secretFiles, dispatch] = useReducer(
        secretFileReducer,
        initialSecretFilesState,
    );

    return (
        <SecretFileContext.Provider value={secretFiles}>
            <SecretFileDispatchContext.Provider value={dispatch}>
                {children}
            </SecretFileDispatchContext.Provider>
        </SecretFileContext.Provider>
    );
};

export default SecretFileProvider;
