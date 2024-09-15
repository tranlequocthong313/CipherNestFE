import { useContext } from "react";
import { EmbedApiContext, EmbedContext, EmbedDispatchContext } from "../contexts/EmbedContext";

export const useEmbed = () => {
    const context = useContext(EmbedContext);
    if (!context) {
        throw new Error("useEmbed must be used within a EmbedProvider");
    }
    return context;
};

export const useEmbedDispatch = () => {
    const context = useContext(EmbedDispatchContext);
    if (!context) {
        throw new Error(
            "useEmbedDispatch must be used within a EmbedProvider",
        );
    }
    return context;
};

export const useEmbedApi = () => {
    const context = useContext(EmbedApiContext);
    if (!context) {
        throw new Error("useEmbedApi must be used within a EmbedProvider");
    }
    return context;
};
