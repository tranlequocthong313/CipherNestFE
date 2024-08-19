import React, { createContext } from "react";
import { ICoverFileState } from "../interfaces/ICoverFile";
import { TCoverFileAction } from "../types/TCoverFile";

export const CoverFileContext = createContext<ICoverFileState>({
    files: [],
    selectedId: "",
});
export const CoverFileDispatchContext = createContext<
    React.Dispatch<TCoverFileAction> | undefined
>(undefined);
