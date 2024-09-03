import React, { useEffect, useReducer, useState } from 'react';
import embedReducer, { initialEmbedState } from '../reducers/embedReducer';
import { EmbedContext, EmbedDispatchContext } from '../contexts/EmbedContext';
import { IEmbedProps } from '../interfaces/IEmbed';
import HTTP, { coverFileApis } from '../configs/api';
import { useCoverFile, useCoverFileDispatch } from '../hooks/useCoverFile';
import { useSecretFile, useSecretFileDispatch } from '../hooks/useSecretFile';
import { CODES, DEBUG } from '../configs/constant';
import { v4 as uuid } from "uuid";

const EmbedProvider: React.FC<IEmbedProps> = ({ children }) => {
    const [embed, dispatch] = useReducer(embedReducer, initialEmbedState);
    const coverFileState = useCoverFile();
    const secretFileState = useSecretFile();
    const dispatchCoverFile = useCoverFileDispatch()
    const dispatchSecretFile = useSecretFileDispatch()
    const [isLoading, setIsLoading] = useState(false);

    const openLoading = () => {
        setIsLoading(true)
    }

    const closeLoading = () => {
        setIsLoading(false)
    }

    useEffect(() => {
        const updateEmbedStatus = async () => {
            const form = new FormData();
            const coverFile = coverFileState.files.find(
                (coverFile) => coverFile.id === coverFileState.selectedId
            );
            if (!coverFile || !coverFile.file) {
                return;
            }
            form.append('cover_file', coverFile.file);
            form.append('output_quality', embed.outputQuality);
            try {
                openLoading()

                const res = await HTTP.post(coverFileApis.coverFileInformation, form);
                if (res.data.code === CODES.IS_EMBEDDED_BY_SYSTEM) {
                    const version = res.data.data.version
                    const filenames = res.data.data.filenames
                    const sizes = res.data.data.sizes
                    const files = filenames.map((filename: string, index: number) => {
                        return {
                            id: uuid(),
                            name: filename,
                            size: sizes[index]
                        }
                    })
                    dispatchCoverFile({
                        type: 'UPDATE_INFO',
                        payload: {
                            id: coverFileState.selectedId,
                            new_info: {
                                isEmbedded: true,
                                version
                            }
                        }
                    })
                    dispatchSecretFile({
                        type: 'ADD_EMBEDDED_SECRET_FILES',
                        payload: { files }
                    })
                } else {
                    dispatch({
                        type: 'UPDATE_FREE_SPACE',
                        payload: {
                            initFreeSpace: res.data.data,
                            totalSecretFileSize: secretFileState.totalSecretFileSize,
                        },
                    });
                }
            } catch (err) {
                if (DEBUG) {
                    console.error('GET COVER FILE INFORMATION ERR:::', err);
                }
            } finally {
                closeLoading()
            }
        };

        updateEmbedStatus();
    }, [
        coverFileState.selectedId,
        embed.outputQuality,
        secretFileState.totalSecretFileSize
    ]);

    return (
        <EmbedContext.Provider value={{ ...embed, isLoading }}>
            <EmbedDispatchContext.Provider value={dispatch}>
                {children}
            </EmbedDispatchContext.Provider>
        </EmbedContext.Provider>
    );
};

export default EmbedProvider;
