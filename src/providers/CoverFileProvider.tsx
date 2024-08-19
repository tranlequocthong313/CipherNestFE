import React, { useState, useEffect, ReactNode, useReducer } from "react";
import getMatrixTheme from "../configs/theme";
import { ITheme, IThemeProviderProps } from "../interfaces/ITheme";
import ThemeContext from "../contexts/ThemeContext";
import coverFileReducer, {
    initialCoverFilesState,
} from "../reducers/coverFileReducer";
import {
    CoverFileContext,
    CoverFileDispatchContext,
} from "../contexts/CoverFileContext";

const CoverFileProvider: React.FC<IThemeProviderProps> = ({ children }) => {
    const [coverFiles, dispatch] = useReducer(
        coverFileReducer,
        initialCoverFilesState,
    );

    return (
        <CoverFileContext.Provider value={coverFiles}>
            <CoverFileDispatchContext.Provider value={dispatch}>
                {children}
            </CoverFileDispatchContext.Provider>
        </CoverFileContext.Provider>
    );
};

export default CoverFileProvider;
