import { DEBUG } from "../configs/constant";
import { ICoverFileState } from "../interfaces/ICoverFile";
import { TCoverFileAction } from "../types/TCoverFile";

export const initialCoverFilesState: ICoverFileState = {
    files: [],
    selectedId: "",
    onActionSelectedId: "",
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
        case "UPDATE_INFO":
            return {
                ...state,
                files: state.files.map(file => {
                    if (file.id === state.selectedId) {
                        return {
                            ...file,
                            ...action.payload.new_info
                        }
                    }
                    return file
                })
            }
        case "ON_ACTION_SELECT":
            return {
                ...state,
                onActionSelectedId: action.payload.id,
            };
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
                onActionSelectedId: files.length > 0 ? files[0].id : state.selectedId,
                selectedId: files.length > 0 ? files[0].id : state.selectedId
            };
        case "SELECT":
            return {
                ...state,
                selectedId: action.payload.id,
                onActionSelectedId: action.payload.id,
            };
        case "DELETE":
            return {
                ...state,
                files: state.files.filter((file) => file.id !== action.payload.id),
                selectedId: '',
                onActionSelectedId: ''
            };
        case "DELETE_ALL":
            return initialCoverFilesState;
        default:
            return state;
    }
};

export default coverFileReducer;
