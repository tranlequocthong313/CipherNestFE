import { DEBUG } from "../configs/constant";
import { IEmbeddedSecretFile, ISecretFile, ISecretFileState } from "../interfaces/ISecretFile";
import { TSecretFileAction } from "../types/TSecretFile";

export const initialSecretFilesState: ISecretFileState = {
    files: {},
    embeddedFiles: [],
    selectedId: "",
    selectedCoverFileId: "",
    totalSecretFileSize: 0,
    totalEmbeddedSecretFileSize: 0
};

const totalSize = (files: any[] = []) => {
    return files.reduce((acc: number, file: ISecretFile | IEmbeddedSecretFile) => acc + file.size, 0);
};

const secretFileReducer = (
    state: ISecretFileState,
    action: TSecretFileAction,
): ISecretFileState => {
    if (DEBUG) {
        console.group(action.type);
        console.log(action);
        console.groupEnd();
    }
    switch (action.type) {
        case "ADD_EMBEDDED_SECRET_FILES": {
            return {
                ...state,
                embeddedFiles: action.payload.files,
                totalEmbeddedSecretFileSize: totalSize(action.payload.files)
            };
        }
        case "ADD": {
            const { files } = action.payload
            if (!state.files[state.selectedCoverFileId]) {
                state.files[state.selectedCoverFileId] = []
            }
            const newState = {
                ...state,
                files: {
                    ...state.files,
                    [state.selectedCoverFileId]:
                        [
                            ...state.files[state.selectedCoverFileId],
                            ...files.filter(
                                (newFile) =>
                                    !state.files[state.selectedCoverFileId].some(
                                        (existingFile) =>
                                            existingFile.name === newFile.name &&
                                            existingFile.size === newFile.size,
                                    ),
                            ),
                        ]
                },
            };
            newState.totalSecretFileSize = totalSize(newState.files[state.selectedCoverFileId])
            return newState
        }
        case "SELECT_COVER_FILE":
            return {
                ...state,
                selectedCoverFileId: action.payload.coverFileId,
                totalSecretFileSize: totalSize(state.files[action.payload.coverFileId]),
                embeddedFiles: []
            };
        case "SELECT":
            return {
                ...state,
                selectedId: action.payload.id,
            };
        case "DELETE": {
            const { id } = action.payload
            const newState = {
                ...state,
                files: {
                    ...state.files,
                    [state.selectedCoverFileId]: state.files[state.selectedCoverFileId].filter((file) => file.id !== id),
                },
            };
            newState.totalSecretFileSize = totalSize(newState.files[state.selectedCoverFileId])
            return newState
        }
        case "DELETE_BY_COVER_FILE":
            delete state.files[action.payload.selectedCoverFileId]
            return {
                ...state,
            };
        case "DELETE_ALL":
            return initialSecretFilesState;
        default:
            return state;
    }
};

export default secretFileReducer;
