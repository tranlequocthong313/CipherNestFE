import React, { useState } from "react";
import {
    TableRow,
    TableCell,
    IconButton,
    Typography,
    Tooltip,
    Box,
} from "@mui/material";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import WavesIcon from "@mui/icons-material/Waves";
import GraphicEq from "@mui/icons-material/GraphicEq";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import CodeIcon from "@mui/icons-material/Code";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import MovieIcon from "@mui/icons-material/Movie";
import AudiotrackIcon from "@mui/icons-material/Audiotrack";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
import ArticleIcon from "@mui/icons-material/Article";
import DescriptionIcon from "@mui/icons-material/Description";
import { styled } from "@mui/system";
import DeleteIcon from "@mui/icons-material/Delete";
import { ISecretFileItemProps } from "../interfaces/ISecretFile";
import { formatDateTime, formatFileSize } from "../utils/formatter";
import { useTheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import Dialog from "./Dialog";

const StyledTableRow = styled(TableRow, {
    shouldForwardProp: (prop) => prop !== "isSelected",
})<{ isSelected: boolean }>(({ theme, isSelected }) => ({
    backgroundColor: isSelected
        ? theme.palette.action.selected
        : theme.palette.background.paper,
    cursor: "pointer",
    "&:hover": {
        backgroundColor: isSelected
            ? theme.palette.action.selected
            : theme.palette.action.hover,
    },
    transition: "background-color 0.3s ease",
}));

const icons: { [key: string]: React.ElementType } = {
    // Audio files
    "audio/mpeg": AudiotrackIcon,
    "audio/x-wav": WavesIcon,
    "audio/flac": GraphicEq,
    "audio/mp3": MusicNoteIcon,

    // Video files
    "video/mp4": VideoLibraryIcon,
    "video/x-msvideo": MovieIcon,
    "video/x-flv": MovieIcon,

    // Image files
    "image/jpeg": InsertPhotoIcon,
    "image/png": InsertPhotoIcon,
    "image/gif": InsertPhotoIcon,
    "image/svg+xml": InsertPhotoIcon,

    // Document files
    "application/pdf": PictureAsPdfIcon,
    "application/msword": DescriptionIcon,
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": DescriptionIcon,

    // Code files
    "text/html": CodeIcon,
    "application/javascript": CodeIcon,
    "application/x-python-code": CodeIcon,
    "application/x-sh": CodeIcon,
    "application/x-executable": CodeIcon,
    "text/x-c": CodeIcon,
    "text/x-c++src": CodeIcon,
    "text/x-java": CodeIcon,

    // Others
    "application/octet-stream": InsertDriveFileIcon,
    "text/plain": ArticleIcon,
};

const SecretFileItem: React.FC<ISecretFileItemProps> = ({
    file,
    isSelected,
    onSelect,
    onDelete,
}) => {
    const theme = useTheme();
    const { t } = useTranslation();
    const Icon = icons[file.type] || InsertDriveFileIcon;
    const [openConfirm, setOpenConfirm] = useState(false);

    const handleOpenConfirm = () => {
        setOpenConfirm(true);
    };

    const handleCloseConfirm = () => {
        setOpenConfirm(false);
    };

    const handleConfirmDelete = () => {
        onDelete(); // Thực hiện hành động xóa
        handleCloseConfirm(); // Đóng hộp thoại
    };

    return (
        <StyledTableRow
            theme={theme}
            key={file.id}
            isSelected={isSelected}
            onClick={onSelect}
        >
            <TableCell sx={{ textAlign: "center" }}>
                <Tooltip title={file.type}>
                    <IconButton>
                        <Icon />
                    </IconButton>
                </Tooltip>
            </TableCell>
            <TableCell sx={{ textAlign: "center" }}>
                <Tooltip title={file.name}>
                    <Typography>{file.name}</Typography>
                </Tooltip>
            </TableCell>
            <TableCell sx={{ textAlign: "center" }}>
                <Tooltip title={formatFileSize(file.size)}>
                    <Typography>{formatFileSize(file.size)}</Typography>
                </Tooltip>
            </TableCell>
            <TableCell sx={{ textAlign: "center" }}>
                <Tooltip title={formatDateTime(file.lastModified)}>
                    <Typography>{formatDateTime(file.lastModified)}</Typography>
                </Tooltip>
            </TableCell>
            <TableCell sx={{ textAlign: "center" }}>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Tooltip title={t("deleteFile")}>
                        <IconButton onClick={handleOpenConfirm}>
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                </Box>
            </TableCell>

            <Dialog
                open={openConfirm}
                onClose={handleCloseConfirm}
                title={t("confirmDeleteTitle")}
                message={t("confirmDeleteMessage")}
                secondary={t("cancel")}
                onSecondary={handleCloseConfirm}
                onPrimary={handleConfirmDelete}
                primary={t("confirm")}
            />
        </StyledTableRow>
    );
};

export default SecretFileItem;
