import React, { useReducer, useState } from 'react';
import embedReducer, { initialEmbedState } from '../reducers/embedReducer';
import { EmbedApiContext, EmbedContext, EmbedDispatchContext } from '../contexts/EmbedContext';
import { IEmbedProps } from '../interfaces/IEmbed';
import HTTP, { coverFileApis } from '../configs/api';
import { useCoverFile, useCoverFileDispatch } from '../hooks/useCoverFile';
import { useSecretFile, useSecretFileApi, useSecretFileDispatch } from '../hooks/useSecretFile';
import { CODES, DEBUG } from '../configs/constant';
import { v4 as uuid } from "uuid";
import axios from 'axios';
import { useExtract, useExtractDispatch } from '../hooks/useExtract';
import { ICoverFile } from '../interfaces/ICoverFile';
import { ISecretFile } from '../interfaces/ISecretFile';
import { formatFileSize } from '../utils/formatter';

const EmbedProvider: React.FC<IEmbedProps> = ({ children }) => {
    const [embed, dispatch] = useReducer(embedReducer, initialEmbedState);
    const coverFileState = useCoverFile();
    const { } = useSecretFile();
    const dispatchCoverFile = useCoverFileDispatch()
    const dispatchSecretFile = useSecretFileDispatch()
    const [isLoading, setIsLoading] = useState(false);
    const dispatchExtract = useExtractDispatch()
    const { secretFilesByCoverFile } = useSecretFileApi()

    const openLoading = () => {
        setIsLoading(true)
    }

    const closeLoading = () => {
        setIsLoading(false)
    }

    const updateEmbedStatus = async ({
        password = undefined,
        coverFileId = coverFileState.selectedId,
        coverFile = undefined,
        outputQuality = embed.outputQuality,
        secretFiles = secretFilesByCoverFile()
    }: {
        password?: string,
        coverFileId?: string,
        coverFile?: ICoverFile,
        outputQuality?: string,
        secretFiles?: ISecretFile[],
    }) => {
        const form = new FormData();
        const _coverFile = coverFile || coverFileState.files.find(
            (coverFile) => coverFile.id === coverFileId
        );
        if (!_coverFile || !_coverFile.file) {
            return;
        }
        form.append('cover_file', _coverFile.file);
        form.append('output_quality', outputQuality);
        if (password) {
            form.append('password', password);
        }
        secretFiles?.forEach((file, index) => {
            if (file.file) {
                form.append(`secret_files[${index}]`, file.file);
            }
        });
        try {
            openLoading()

            const res = await HTTP.post(coverFileApis.coverFileInformation, form);

            if (res.data.code !== CODES.IS_EMBEDDED_BY_SYSTEM) {
                dispatch({
                    type: 'UPDATE_FREE_SPACE',
                    payload: {
                        freeSpace: res.data.data,
                    },
                });
                return
            }

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
        } catch (err) {
            if (DEBUG) {
                console.error('GET COVER FILE INFORMATION ERR:::', err);
            }
            if (axios.isAxiosError(err) && err.response) {
                if (!err.response.data) { return }
                if ([CODES.REQUIRE_PASSWORD, CODES.WRONG_PASSWORD].includes(err.response.data.code)) {
                    dispatchExtract({
                        type: 'OPEN_PASSWORD_MODAL',
                        payload: {
                            isWrongPassword: err.response.data.code === CODES.WRONG_PASSWORD
                        }
                    })
                }
            }
        } finally {
            closeLoading()
        }
    };

    return (
        <EmbedContext.Provider value={{ ...embed, isLoading }}>
            <EmbedDispatchContext.Provider value={dispatch}>
                <EmbedApiContext.Provider value={{ updateEmbedStatus, openLoading, closeLoading }}>
                    {children}
                </EmbedApiContext.Provider>
            </EmbedDispatchContext.Provider>
        </EmbedContext.Provider>
    );
};

export default EmbedProvider;
