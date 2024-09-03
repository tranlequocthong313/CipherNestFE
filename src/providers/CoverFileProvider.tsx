import React, { useState, useEffect, ReactNode, useReducer } from "react";
import getMatrixTheme from "../configs/theme";
import { ITheme, IThemeProviderProps } from "../interfaces/ITheme";
import ThemeContext from "../contexts/ThemeContext";
import coverFileReducer, {
    initialCoverFilesState,
} from "../reducers/coverFileReducer";
import {
    CoverFileApiContext,
    CoverFileContext,
    CoverFileDispatchContext,
} from "../contexts/CoverFileContext";

const CoverFileProvider: React.FC<IThemeProviderProps> = ({ children }) => {
    const [coverFiles, dispatch] = useReducer(
        coverFileReducer,
        initialCoverFilesState,
    );

    const selectedCoverFile = () => {
        return coverFiles.files.find(coverFile => coverFile.id === coverFiles.selectedId)
    }

    return (
        <CoverFileContext.Provider value={coverFiles}>
            <CoverFileDispatchContext.Provider value={dispatch}>
                <CoverFileApiContext.Provider value={{ selectedCoverFile }}>
                    {children}
                </CoverFileApiContext.Provider>
            </CoverFileDispatchContext.Provider>
        </CoverFileContext.Provider>
    );
};

export default CoverFileProvider;
