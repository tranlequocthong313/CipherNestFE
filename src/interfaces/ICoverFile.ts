import { ReactNode } from "react";

export interface ICoverFile {
    id: string;
    name: string;
    path: string;
    size: number; // size in bytes
    type: string;
    lastModified: number;
    blob: string;
    duration?: number | null;
    file?: File;
    version?: string;
    isEmbedded?: boolean;
    password?: string;
}

export interface ICoverFileState {
    files: ICoverFile[];
    selectedId: string;
    onActionSelectedId: string;
}

export interface ICoverFileItemProps {
    file: ICoverFile;
    isSelected: boolean;
    onSelect: () => void;
    onAddSecret: () => void;
    onDelete: () => void;
    onPlay?: () => void;
}

export interface ICoverFilesProviderProps {
    children: ReactNode;
}

export interface IAudioPlayProps {
    id: string;
    src: string;
    onPlay?: (e: any) => void;
}

export interface ICoverFileApi {
    selectedCoverFile: () => ICoverFile | undefined
}
