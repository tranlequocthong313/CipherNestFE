import React, { useRef, useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from '@mui/material';
import CoverFileItem from './CoverFileItem';
import {
    useCoverFile,
    useCoverFileApi,
    useCoverFileDispatch,
} from '../hooks/useCoverFile';
import { useTranslation } from 'react-i18next';
import { useSecretFile, useSecretFileDispatch } from '../hooks/useSecretFile';
import { isValidFile } from '../utils/validator';
import { v4 as uuid } from 'uuid';
import { useEmbed, useEmbedApi } from '../hooks/useEmbed';
import Dialog from './Dialog';
import { formatFileSize } from '../utils/formatter';
import PasswordModal from './PasswordModal';
import { useExtract, useExtractDispatch } from '../hooks/useExtract';

const CoverFileList: React.FC = () => {
    const { files, selectedId } = useCoverFile();
    const dispatchCoverFile = useCoverFileDispatch();
    const dispatchSecretFile = useSecretFileDispatch();
    const { t } = useTranslation(); // Khai báo hàm t từ useTranslation
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { initFreeSpace } = useEmbed();
    const { totalSecretFileSize } = useSecretFile();
    const [message, setMessage] = useState('');
    const { isOpenPasswordModal } = useExtract();
    const dispatchExtract = useExtractDispatch();
    const { selectedCoverFile } = useCoverFileApi();
    const { updateEmbedStatus } = useEmbedApi();

    const handleSelect = async (id: string) => {
        dispatchCoverFile({
            type: 'SELECT',
            payload: { id },
        });
        dispatchSecretFile({
            type: 'SELECT_COVER_FILE',
            payload: { coverFileId: id },
        });

        await updateEmbedStatus({ coverFileId: id });
    };

    const onAddSecret = () => {
        fileInputRef.current?.click();
    };

    const handleAddSecret = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const files = event.target.files;
        if (files) {
            const newFileArray = Array.from(files).map((file) => {
                if (!isValidFile(file)) {
                    return null;
                }
                return {
                    name: file.name,
                    lastModified: file.lastModified,
                    path: file.webkitRelativePath,
                    size: file.size,
                    type: file.type,
                    id: uuid(),
                    file: file,
                };
            });

            const validFiles = newFileArray.filter(
                (file): file is NonNullable<typeof file> => file !== null
            );
            let newSize = totalSecretFileSize;
            const result = [];
            let exceeded = false;
            for (let file of validFiles) {
                newSize += file.size;
                if (newSize > initFreeSpace) {
                    exceeded = true;
                    newSize -= file.size;
                } else {
                    result.push(file);
                }
            }
            if (exceeded) {
                setMessage(
                    t('fileExceedLimit', { limit: formatFileSize(initFreeSpace) })
                );
            }

            dispatchSecretFile({
                type: 'ADD',
                payload: { files: result },
            });
        }
    };

    const handleDelete = async (id: string) => {
        dispatchCoverFile({
            type: 'DELETE',
            payload: { id },
        });
        dispatchSecretFile({
            type: 'DELETE_BY_COVER_FILE',
            payload: {
                selectedCoverFileId: id,
            },
        });
    };

    const handleUnlock = async (password: string) => {
        dispatchCoverFile({
            type: 'UPDATE_INFO',
            payload: {
                new_info: {
                    password,
                },
            },
        });

        await updateEmbedStatus({ password });
    };

    const handleClosePasswordModal = () => {
        dispatchExtract({
            type: 'CLOSE_PASSWORD_MODAL',
        });
    };

    return (
        <>
            <TableContainer
                component={Paper}
                sx={{
                    maxHeight: 427,
                    overflow: 'auto', // Kích hoạt cuộn khi cần
                }}
            >
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ textAlign: 'center' }}>
                                {t('fileType')}
                            </TableCell>
                            <TableCell sx={{ textAlign: 'center' }}>
                                {t('fileName')}
                            </TableCell>
                            <TableCell sx={{ textAlign: 'center' }}>
                                {t('audioDuration')}
                            </TableCell>
                            <TableCell sx={{ textAlign: 'center' }}>
                                {t('fileSize')}
                            </TableCell>
                            <TableCell sx={{ textAlign: 'center' }}>
                                {t('lastModified')}
                            </TableCell>
                            <TableCell sx={{ textAlign: 'center' }}>{t('version')}</TableCell>
                            <TableCell sx={{ textAlign: 'center' }}></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {files.length ? (
                            files.map((file) => (
                                <CoverFileItem
                                    key={file.id}
                                    file={file}
                                    isSelected={file.id === selectedId}
                                    onSelect={() => handleSelect(file.id)}
                                    onAddSecret={onAddSecret}
                                    onDelete={() => handleDelete(file.id)}
                                />
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={6} align='center'>
                                    {t('empty_list')}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <input
                type='file'
                ref={fileInputRef}
                style={{ display: 'none' }}
                multiple
                accept='*/*'
                onChange={handleAddSecret}
            />
            <Dialog
                open={message !== null && message.trim() !== ''}
                title={t('information')}
                message={message}
                onClose={() => setMessage('')}
                primary={t('ok')}
                onPrimary={() => setMessage('')}
            />

            <PasswordModal
                open={isOpenPasswordModal}
                onClose={handleClosePasswordModal}
                onUnlock={handleUnlock}
                title={selectedCoverFile()?.name || ''}
            />
        </>
    );
};

export default CoverFileList;
