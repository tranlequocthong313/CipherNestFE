import React, { createContext } from "react";
import { IEmbedState } from "../interfaces/IEmbed";
import { initialEmbedState } from "../reducers/embedReducer";
import { TEmbed } from "../types/TEmbed";

export const EmbedContext = createContext<IEmbedState>(initialEmbedState);
export const EmbedDispatchContext = createContext<
    React.Dispatch<TEmbed> | undefined
>(undefined);
