import { DEBUG } from "../configs/constant";
import { ICoverFileState } from "../interfaces/ICoverFile";
import { TCoverFileAction } from "../types/TCoverFile";

export const initialCoverFilesState: ICoverFileState = {
    files: [],
    selectedId: "",
};

const coverFileReducer = (
    state: ICoverFileState,
    action: TCoverFileAction,
): ICoverFileState => {
    if (DEBUG) {
        console.group(action.type);
        console.log(action);
        console.groupEnd();
    }

    switch (action.type) {
        case "ADD":
            const { files } = action.payload

            return {
                ...state,
                files: [
                    ...state.files,
                    ...files.filter(
                        (newFile) =>
                            !state.files.some(
                                (existingFile) =>
                                    existingFile.name === newFile.name &&
                                    existingFile.size === newFile.size,
                            ),
                    ),
                ],
            };
        case "SELECT":
            return {
                ...state,
                selectedId: action.payload.id,
            };
        case "DELETE":
            return {
                ...state,
                files: state.files.filter((file) => file.id !== action.payload.id),
            };
        case "DELETE_ALL":
            return initialCoverFilesState;
        default:
            return state;
    }
};

export default coverFileReducer;
