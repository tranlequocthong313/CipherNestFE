import { ReactNode } from "react"
import { ICoverFile } from "./ICoverFile";
import { ISecretFile } from "./ISecretFile";

export interface IEmbedState {
    outputQuality: string,
    freeSpace: number,
    compressed: boolean,
    algorithm: string,
    isLoading?: boolean
}

export interface IEmbedProps {
    children: ReactNode
}

export interface IEmbedApi {
    updateEmbedStatus: (params: {
        password?: string,
        coverFileId?: string,
        coverFile?: ICoverFile,
        outputQuality?: string,
        secretFiles?: ISecretFile[],
    }) => Promise<void>;
    openLoading: () => void;
    closeLoading: () => void;
}
