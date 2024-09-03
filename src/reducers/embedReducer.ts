import { ALGORITHMS, DEBUG, LOCAL_STORAGE_ALGORITHM_KEY, LOCAL_STORAGE_COMPRESSED_KEY, LOCAL_STORAGE_OUTPUT_QUALITY_KEY, OUTPUT_QUALITIES } from "../configs/constant"
import { IEmbedState } from "../interfaces/IEmbed"
import { TEmbed } from "../types/TEmbed"

export const initialEmbedState: IEmbedState = {
    outputQuality: localStorage.getItem(LOCAL_STORAGE_OUTPUT_QUALITY_KEY) || OUTPUT_QUALITIES.MEDIUM,
    freeSpace: 0,
    initFreeSpace: -1,
    compressed: JSON.parse(localStorage.getItem(LOCAL_STORAGE_COMPRESSED_KEY) || "false"),
    algorithm: localStorage.getItem(LOCAL_STORAGE_ALGORITHM_KEY) || ALGORITHMS.LSB,
    usedPercentage: 0,
}

const embedReducer = (
    state: IEmbedState,
    action: TEmbed,
): IEmbedState => {
    if (DEBUG) {
        console.group(action.type)
        console.log(action)
        console.groupEnd()
    }
    switch (action.type) {
        case "UPDATE_FREE_SPACE": {
            const { totalSecretFileSize = 0, initFreeSpace } = action.payload
            if (initFreeSpace <= 0) {
                throw new Error("Free space must be greater than 0")
            }
            const usedPercentage = Math.min(Math.trunc((totalSecretFileSize / initFreeSpace) * 100), 100)
            const freeSpace = initFreeSpace - totalSecretFileSize
            return {
                ...state,
                freeSpace,
                usedPercentage,
                initFreeSpace,
            }
        }
        case "CHANGE_OUTPUT_QUALITY":
            localStorage.setItem(LOCAL_STORAGE_OUTPUT_QUALITY_KEY, action.payload.outputQuality)
            return {
                ...state,
                outputQuality: action.payload.outputQuality,
                initFreeSpace: -1,
            }
        case "CLEAR":
            return {
                ...state,
                initFreeSpace: -1,
                freeSpace: 0,
                usedPercentage: 0,
            }
        default:
            return state
    }
}

export default embedReducer
