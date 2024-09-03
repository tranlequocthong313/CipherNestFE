import { DEBUG } from "../configs/constant"
import { IExtractState } from "../interfaces/IExtract"
import { TExtract } from "../types/TExtract"

export const initialExtractState: IExtractState = {
    passphrase: '',
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
        default:
            return state
    }
}

export default embedReducer
