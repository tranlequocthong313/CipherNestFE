import { ReactNode } from "react"

export interface IEmbedState {
    outputQuality: string,
    freeSpace: number,
    initFreeSpace: number,
    compressed: boolean,
    algorithm: string,
    usedPercentage: number,
    isLoading?: boolean
}

export interface IEmbedProps {
    children: ReactNode
}
