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
import CoverFileItem from "./CoverFileItem";
import { useCoverFile, useCoverFileDispatch } from "../hooks/useCoverFile";
import { useTranslation } from "react-i18next"; // Thêm import useTranslation

const CoverFileList: React.FC = () => {
    const { files, selectedId } = useCoverFile();
    const dispatchCoverFile = useCoverFileDispatch();
    const { t } = useTranslation(); // Khai báo hàm t từ useTranslation

    const handleSelect = (id: string) => {
        dispatchCoverFile({
            type: "SELECT",
            payload: { id },
        });
    };

    const handleAddSecret = (id: string) => {
        // Xử lý thêm secret file
    };

    const handleDelete = (id: string) => {
        dispatchCoverFile({
            type: "DELETE",
            payload: { id },
        });
    };

    return (
        <TableContainer
            component={Paper}
            sx={{
                maxHeight: 500,
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
                    {files.map((file) => (
                        <CoverFileItem
                            key={file.id}
                            file={file}
                            isSelected={file.id === selectedId}
                            onSelect={() => handleSelect(file.id)}
                            onAddSecret={() => handleAddSecret(file.id)}
                            onDelete={() => handleDelete(file.id)}
                        />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default CoverFileList;
