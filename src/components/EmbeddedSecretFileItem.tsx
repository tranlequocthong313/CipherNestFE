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
import { IEmbeddedSecretFileItemProps } from "../interfaces/ISecretFile";
import { formatDateTime, formatFileSize } from "../utils/formatter";
import { useTheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import Dialog from "./Dialog";
import { Lock } from "@mui/icons-material";

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

const EmbeddedSecretFileItem: React.FC<IEmbeddedSecretFileItemProps> = ({
    file,
    isSelected,
    onSelect,
}) => {
    const theme = useTheme();
    const { t } = useTranslation();
    const Icon = Lock;

    return (
        <StyledTableRow
            theme={theme}
            key={file.id}
            isSelected={isSelected}
            onClick={onSelect}
        >
            <TableCell sx={{ textAlign: "center" }}>
                <IconButton>
                    <Icon />
                </IconButton>
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
        </StyledTableRow>
    );
};

export default EmbeddedSecretFileItem;
