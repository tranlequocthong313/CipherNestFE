import React from "react";
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
import EmbeddedSecretFileItem from "./EmbeddedSecretFileItem";
import { useTranslation } from "react-i18next"; // Thêm import useTranslation
import { useSecretFile, useSecretFileDispatch } from "../hooks/useSecretFile";

const EmbeddedSecretFileList: React.FC = () => {
    const { embeddedFiles, selectedId, selectedCoverFileId } = useSecretFile()
    const dispatchEmbeddedSecretFile = useSecretFileDispatch();
    const { t } = useTranslation(); // Khai báo hàm t từ useTranslation

    const handleSelect = (id: string) => {
        dispatchEmbeddedSecretFile({
            type: "SELECT",
            payload: { id },
        });
    };

    const handleDelete = async (id: string) => {
        dispatchEmbeddedSecretFile({
            type: "DELETE",
            payload: { id },
        });
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
                            <TableCell sx={{ textAlign: "center" }}></TableCell>
                            <TableCell sx={{ textAlign: "center" }}>{t("fileName")}</TableCell>
                            <TableCell sx={{ textAlign: "center" }}>{t("fileSize")}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {embeddedFiles.length > 0 ?
                            embeddedFiles.map((file) => (
                                <EmbeddedSecretFileItem
                                    key={file.id}
                                    file={file}
                                    isSelected={file.id === selectedId}
                                    onSelect={() => handleSelect(file.id)}
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
        </>
    );
};

export default EmbeddedSecretFileList;
