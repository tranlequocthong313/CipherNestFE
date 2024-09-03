import React, { createContext } from "react";
import { ISecretFileApi, ISecretFileState } from "../interfaces/ISecretFile";
import { initialSecretFilesState } from "../reducers/secretFileReducer";
import { TSecretFileAction } from "../types/TSecretFile";

export const SecretFileContext = createContext<ISecretFileState>(initialSecretFilesState);
export const SecretFileDispatchContext = createContext<
    React.Dispatch<TSecretFileAction> | undefined
>(undefined);
export const SecretFileApiContext = createContext<ISecretFileApi | undefined>(undefined);
