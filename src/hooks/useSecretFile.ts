import { useContext } from "react";
import {
    SecretFileContext,
    SecretFileDispatchContext,
} from "../contexts/SecretFileContext";

export const useSecretFile = () => {
    const context = useContext(SecretFileContext);
    if (!context) {
        throw new Error("useSecretFiles must be used within a SecretFilesProvider");
    }
    return context;
};

export const useSecretFileDispatch = () => {
    const context = useContext(SecretFileDispatchContext);
    if (!context) {
        throw new Error(
            "useSecretFilesDispatch must be used within a SecretFilesProvider",
        );
    }
    return context;
};
