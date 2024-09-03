import { ReactNode } from "react";

export interface ISecretFile {
    id: string;
    name: string;
    path: string;
    size: number; // size in bytes
    type: string;
    lastModified: number;
    file?: File;
}

export interface IEmbeddedSecretFile {
    id: string;
    name: string;
    size: number; // size in bytes
}

export interface ISecretFileState {
    files: { [key: string]: ISecretFile[] };
    selectedId: string;
    selectedCoverFileId: string;
    totalSecretFileSize: number;
    embeddedFiles: IEmbeddedSecretFile[];
    totalEmbeddedSecretFileSize: number;
}

export interface ISecretFileItemProps {
    file: ISecretFile;
    isSelected: boolean;
    onSelect: () => void;
    onDelete: () => void;
}

export interface IEmbeddedSecretFileItemProps {
    file: IEmbeddedSecretFile;
    isSelected: boolean;
    onSelect: () => void;
}

export interface ISecretFilesProviderProps {
    children: ReactNode;
}

export interface ISecretFileApi {
    secretFilesByCoverFile: () => ISecretFile[]
}
