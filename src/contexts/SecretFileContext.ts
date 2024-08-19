import React, { createContext } from "react";
import { ISecretFileState } from "../interfaces/ISecretFile";
import { TSecretFileAction } from "../types/TSecretFile";

export const SecretFileContext = createContext<ISecretFileState>({
    files: {},
    selectedId: "",
    selectedCoverFileId: "",
});
export const SecretFileDispatchContext = createContext<
    React.Dispatch<TSecretFileAction> | undefined
>(undefined);
