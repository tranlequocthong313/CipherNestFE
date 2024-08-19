import { DEBUG } from "../configs/constant";
import { ISecretFileState } from "../interfaces/ISecretFile";
import { TSecretFileAction } from "../types/TSecretFile";

export const initialSecretFilesState: ISecretFileState = {
    files: {},
    selectedId: "",
    selectedCoverFileId: "",
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
        case "ADD":
            const { files } = action.payload
            if (!state.files[state.selectedCoverFileId]) {
                state.files[state.selectedCoverFileId] = []
            }
            return {
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
        case "SELECT_COVER_FILE":
            return {
                ...state,
                selectedCoverFileId: action.payload.coverFileId,
            };
        case "SELECT":
            return {
                ...state,
                selectedId: action.payload.id,
            };
        case "DELETE":
            const { id } = action.payload
            return {
                ...state,
                files: {
                    ...state.files,
                    [state.selectedCoverFileId]: state.files[state.selectedCoverFileId].filter((file) => file.id !== id),
                }
            };
        case "DELETE_BY_COVER_FILE":
            delete state.files[state.selectedCoverFileId]
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
