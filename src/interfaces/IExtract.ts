import { ReactNode } from "react"

export interface IExtractState {
    isOpenPasswordModal: boolean
    isWrongPassword: boolean
}

export interface IExtractProps {
    children: ReactNode
}
