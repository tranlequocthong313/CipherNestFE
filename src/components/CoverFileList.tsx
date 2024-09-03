import React, { useRef, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Box,
} from "@mui/material";
import CoverFileItem from "./CoverFileItem";
import { useCoverFile, useCoverFileDispatch } from "../hooks/useCoverFile";
import { useTranslation } from "react-i18next"; // Thêm import useTranslation
import { useSecretFile, useSecretFileApi, useSecretFileDispatch } from "../hooks/useSecretFile";
import { isValidFile } from "../utils/validator";
import { getDuration } from "../utils/audio";
import { v4 as uuid } from "uuid";
import { useEmbed, useEmbedDispatch } from "../hooks/useEmbed";
import Dialog from "./Dialog";
import { formatFileSize } from "../utils/formatter";

const CoverFileList: React.FC = () => {
    const { files, selectedId, onActionSelectedId } = useCoverFile();
    const dispatchCoverFile = useCoverFileDispatch();
    const dispatchSecretFile = useSecretFileDispatch();
    const { t } = useTranslation(); // Khai báo hàm t từ useTranslation
    const fileInputRef = useRef<HTMLInputElement>(null);
    const secretFileApi = useSecretFileApi()
    const { initFreeSpace } = useEmbed()
    const { totalSecretFileSize } = useSecretFile()
    const dispatchEmbed = useEmbedDispatch()
    const [message, setMessage] = useState('')

    const handleSelect = async (id: string) => {
        dispatchCoverFile({
            type: "SELECT",
            payload: { id },
        });
        dispatchSecretFile({
            type: "SELECT_COVER_FILE",
            payload: { coverFileId: id },
        });
    };

    const onAddSecret = () => {
        fileInputRef.current?.click();
    }

    const handleAddSecret = async (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const files = event.target.files;
        if (files) {
            const newFileArray = Array.from(files).map((file) => {
                if (!isValidFile(file)) {
                    return null; // Trả về null nếu file không hợp lệ
                }
                return {
                    name: file.name,
                    lastModified: file.lastModified,
                    path: file.webkitRelativePath,
                    size: file.size,
                    type: file.type,
                    id: uuid(), // Tạo ID duy nhất cho mỗi file
                    file: file
                };
            })

            const validFiles = newFileArray.filter(
                (file): file is NonNullable<typeof file> => file !== null,
            );
            let newSize = totalSecretFileSize
            const result = []
            let exceeded = false
            for (let file of validFiles) {
                newSize += file.size
                if (newSize > initFreeSpace) {
                    exceeded = true
                    newSize -= file.size
                } else {
                    result.push(file)
                }
            }
            if (exceeded) {
                setMessage(t('fileExceedLimit', { limit: formatFileSize(initFreeSpace) }))
            }

            dispatchSecretFile({
                type: "ADD",
                payload: { files: result },
            });
        }
    };

    const handleDelete = async (id: string) => {
        dispatchCoverFile({
            type: "DELETE",
            payload: { id },
        });
        dispatchSecretFile({
            type: 'DELETE_BY_COVER_FILE',
            payload: {
                selectedCoverFileId: id
            }
        })
    };

    return (
        <>
            <TableContainer
                component={Paper}
                sx={{
                    maxHeight: 427,
                    overflow: "auto", // Kích hoạt cuộn khi cần
                }}
            >
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ textAlign: "center" }}>{t("fileType")}</TableCell>
                            <TableCell sx={{ textAlign: "center" }}>{t("fileName")}</TableCell>
                            <TableCell sx={{ textAlign: "center" }}>
                                {t("audioDuration")}
                            </TableCell>
                            <TableCell sx={{ textAlign: "center" }}>{t("fileSize")}</TableCell>
                            <TableCell sx={{ textAlign: "center" }}>
                                {t("lastModified")}
                            </TableCell>
                            <TableCell sx={{ textAlign: "center" }}>
                                {t("version")}
                            </TableCell>
                            <TableCell sx={{ textAlign: "center" }}></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {files.length ?
                            files.map((file) => (
                                <CoverFileItem
                                    key={file.id}
                                    file={file}
                                    isSelected={file.id === selectedId}
                                    onSelect={() => handleSelect(file.id)}
                                    onAddSecret={onAddSecret}
                                    onDelete={() => handleDelete(file.id)}
                                />
                            )) : (
                                <TableRow>
                                    <TableCell colSpan={6} align="center">
                                        {t("empty_list")}
                                    </TableCell>
                                </TableRow>
                            )}
                    </TableBody>
                </Table>
            </TableContainer>
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                multiple
                accept="*/*"
                onChange={handleAddSecret}
            />
            <Dialog
                open={message !== null && message.trim() !== ""}
                title={t("information")}
                message={message}
                onClose={() => setMessage('')}
                primary={t("ok")}
                onPrimary={() => setMessage('')}
            />
        </>
    );
};

export default CoverFileList;
