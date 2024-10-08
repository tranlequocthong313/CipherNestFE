import { useContext } from "react";
import {
    CoverFileApiContext,
    CoverFileContext,
    CoverFileDispatchContext,
} from "../contexts/CoverFileContext";

export const useCoverFile = () => {
    const context = useContext(CoverFileContext);
    if (!context) {
        throw new Error("useCoverFiles must be used within a CoverFilesProvider");
    }
    return context;
};

export const useCoverFileDispatch = () => {
    const context = useContext(CoverFileDispatchContext);
    if (!context) {
        throw new Error(
            "useCoverFilesDispatch must be used within a CoverFilesProvider",
        );
    }
    return context;
};

export const useCoverFileApi = () => {
    const context = useContext(CoverFileApiContext);
    if (!context) {
        throw new Error(
            "useCoverFileApi must be used within a CoverFilesProvider",
        );
    }
    return context;
};
