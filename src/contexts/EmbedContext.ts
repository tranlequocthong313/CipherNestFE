import React, { createContext } from "react";
import { IEmbedApi, IEmbedState } from "../interfaces/IEmbed";
import { initialEmbedState } from "../reducers/embedReducer";
import { TEmbed } from "../types/TEmbed";

export const EmbedContext = createContext<IEmbedState>(initialEmbedState);
export const EmbedApiContext = createContext<IEmbedApi | undefined>(undefined);
export const EmbedDispatchContext = createContext<
    React.Dispatch<TEmbed> | undefined
>(undefined);
