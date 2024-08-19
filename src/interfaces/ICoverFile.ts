import { ReactNode } from "react";

export interface ICoverFile {
    id: string;
    name: string;
    path: string;
    size: number; // size in bytes
    type: string;
    lastModified: number;
    blob: string;
    duration: number;
}

export interface ICoverFileState {
    files: ICoverFile[];
    selectedId: string;
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
    onPlay?: () => void;
}
