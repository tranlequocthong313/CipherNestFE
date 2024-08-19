import React, { useRef } from "react";
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
import { useSecretFileDispatch } from "../hooks/useSecretFile";
import { isValidFile } from "../utils/validator";
import { getDuration } from "../utils/audio";
import { v4 as uuid } from "uuid";

const CoverFileList: React.FC = () => {
    const { files, selectedId } = useCoverFile();
    const dispatchCoverFile = useCoverFileDispatch();
    const dispatchSecretFile = useSecretFileDispatch();
    const { t } = useTranslation(); // Khai báo hàm t từ useTranslation
    const fileInputRef = useRef<HTMLInputElement>(null);


    const handleSelect = (id: string) => {
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
            const newFileArray = await Promise.all(
                Array.from(files).map(async (file) => {
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
                    };
                }),
            );

            const validFiles = newFileArray.filter(
                (file): file is NonNullable<typeof file> => file !== null,
            );

            dispatchSecretFile({
                type: "ADD",
                payload: { files: validFiles },
            });
        }
    };

    const handleDelete = (id: string) => {
        dispatchCoverFile({
            type: "DELETE",
            payload: { id },
        });
        dispatchSecretFile({
            type: 'DELETE_BY_COVER_FILE',
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
        </>
    );
};

export default CoverFileList;
