import React, { createContext } from "react";
import { ICoverFileApi, ICoverFileState } from "../interfaces/ICoverFile";
import { initialCoverFilesState } from "../reducers/coverFileReducer";
import { TCoverFileAction } from "../types/TCoverFile";

export const CoverFileContext = createContext<ICoverFileState>(initialCoverFilesState);
export const CoverFileDispatchContext = createContext<
    React.Dispatch<TCoverFileAction> | undefined
>(undefined);
export const CoverFileApiContext = createContext<ICoverFileApi | undefined>(undefined);
