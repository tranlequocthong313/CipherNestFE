import React, { createContext } from "react";
import { IExtractState } from "../interfaces/IExtract";
import { initialExtractState } from "../reducers/extractReducer";
import { TExtract } from "../types/TExtract";

export const ExtractContext = createContext<IExtractState>(initialExtractState);
export const ExtractDispatchContext = createContext<
    React.Dispatch<TExtract> | undefined
>(undefined);
