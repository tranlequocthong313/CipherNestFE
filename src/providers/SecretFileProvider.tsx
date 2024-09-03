import React, { useState, useEffect, ReactNode, useReducer } from "react";
import getMatrixTheme from "../configs/theme";
import { ITheme, IThemeProviderProps } from "../interfaces/ITheme";
import ThemeContext from "../contexts/ThemeContext";
import secretFileReducer, {
    initialSecretFilesState,
} from "../reducers/secretFileReducer";
import {
    SecretFileApiContext,
    SecretFileContext,
    SecretFileDispatchContext,
} from "../contexts/SecretFileContext";

const SecretFileProvider: React.FC<IThemeProviderProps> = ({ children }) => {
    const [secretFiles, dispatch] = useReducer(
        secretFileReducer,
        initialSecretFilesState,
    );

    const secretFilesByCoverFile = () => {
        return secretFiles.files[secretFiles.selectedCoverFileId] || []
    }

    return (
        <SecretFileContext.Provider value={secretFiles}>
            <SecretFileDispatchContext.Provider value={dispatch}>
                <SecretFileApiContext.Provider value={{ secretFilesByCoverFile }}>
                    {children}
                </SecretFileApiContext.Provider>
            </SecretFileDispatchContext.Provider>
        </SecretFileContext.Provider>
    );
};

export default SecretFileProvider;
