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
import SecretFileItem from "./SecretFileItem";
import { useSecretFile, useSecretFileDispatch } from "../hooks/useSecretFile";
import { useTranslation } from "react-i18next"; // Thêm import useTranslation

const SecretFileList: React.FC = () => {
    const { files, selectedId, selectedCoverFileId } = useSecretFile();
    const dispatchSecretFile = useSecretFileDispatch();
    const { t } = useTranslation(); // Khai báo hàm t từ useTranslation

    const handleSelect = (id: string) => {
        dispatchSecretFile({
            type: "SELECT",
            payload: { id },
        });
    };

    const handleAddSecret = (id: string) => {
        // Xử lý thêm secret file
    };

    const handleDelete = (id: string) => {
        dispatchSecretFile({
            type: "DELETE",
            payload: { id },
        });
    };

    return (
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
                        <TableCell sx={{ textAlign: "center" }}>{t("fileSize")}</TableCell>
                        <TableCell sx={{ textAlign: "center" }}>
                            {t("lastModified")}
                        </TableCell>
                        <TableCell sx={{ textAlign: "center" }}></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Object.keys(files).length && files[selectedCoverFileId] && files[selectedCoverFileId].length > 0 ?
                        files[selectedCoverFileId].map((file) => (
                            <SecretFileItem
                                key={file.id}
                                file={file}
                                isSelected={file.id === selectedId}
                                onSelect={() => handleSelect(file.id)}
                                onDelete={() => handleDelete(file.id)}
                            />
                        )) : (
                            <TableRow>
                                <TableCell colSpan={6} align="center">
                                    Danh sách trống
                                </TableCell>
                            </TableRow>
                        )}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default SecretFileList;
