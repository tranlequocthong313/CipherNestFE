import { useContext } from "react";
import { ExtractContext, ExtractDispatchContext } from "../contexts/ExtractContext";

export const useExtract = () => {
    const context = useContext(ExtractContext);
    if (!context) {
        throw new Error("useExtract must be used within a ExtractProvider");
    }
    return context;
};

export const useExtractDispatch = () => {
    const context = useContext(ExtractDispatchContext);
    if (!context) {
        throw new Error(
            "useExtractDispatch must be used within a ExtractProvider",
        );
    }
    return context;
};
