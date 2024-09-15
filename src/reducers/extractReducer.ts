import { DEBUG } from "../configs/constant"
import { IExtractState } from "../interfaces/IExtract"
import { TExtract } from "../types/TExtract"

export const initialExtractState: IExtractState = {
    isOpenPasswordModal: false,
    isWrongPassword: false,
}

const embedReducer = (
    state: IExtractState,
    action: TExtract,
): IExtractState => {
    if (DEBUG) {
        console.group(action.type)
        console.log(action)
        console.groupEnd()
    }
    switch (action.type) {
        case 'OPEN_PASSWORD_MODAL':
            return {
                ...state,
                isOpenPasswordModal: true,
                isWrongPassword: action.payload.isWrongPassword,
            }
        case 'CLOSE_PASSWORD_MODAL':
            return {
                ...state,
                isOpenPasswordModal: false,
            }
        default:
            return state
    }
}

export default embedReducer
