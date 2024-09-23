import { ReactNode } from "react"
import { ICoverFile } from "./ICoverFile";

export interface IEmbedState {
    outputQuality: string,
    initFreeSpace: number,
    compressed: boolean,
    algorithm: string,
    isLoading?: boolean
}

export interface IEmbedProps {
    children: ReactNode
}

export interface IEmbedApi {
    updateEmbedStatus: (params: {
        password?: string;
        coverFileId?: string,
        outputQuality?: string,
        coverFile?: ICoverFile,
    }) => Promise<void>;
    openLoading: () => void;
    closeLoading: () => void;
}
