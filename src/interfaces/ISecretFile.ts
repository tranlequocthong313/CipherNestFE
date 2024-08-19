import { ReactNode } from "react";

export interface ISecretFile {
    id: string;
    name: string;
    path: string;
    size: number; // size in bytes
    type: string;
    lastModified: number;
}

export interface ISecretFileState {
    files: { [key: string]: ISecretFile[] };
    selectedId: string;
    selectedCoverFileId: string;
}

export interface ISecretFileItemProps {
    file: ISecretFile;
    isSelected: boolean;
    onSelect: () => void;
    onDelete: () => void;
}

export interface ISecretFilesProviderProps {
    children: ReactNode;
}
