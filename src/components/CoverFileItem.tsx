import React from "react";
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
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { styled } from "@mui/system";
import { ICoverFile, ICoverFileItemProps } from "../interfaces/ICoverFile";
import {
    formatDateTime,
    formatDuration,
    formatFileSize,
} from "../utils/formatter";
import { SvgIconComponent } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles"; // Updated import
import AudioPlay from "./AudioPlay";
import { useTranslation } from "react-i18next"; // Import useTranslation

const Mp3Icon = styled(MusicNoteIcon)(({ theme }) => ({
    marginRight: theme.spacing(1),
}));

const WavIcon = styled(WavesIcon)(({ theme }) => ({
    marginRight: theme.spacing(1),
}));

const FlacIcon = styled(GraphicEq)(({ theme }) => ({
    marginRight: theme.spacing(1),
}));

const StyledTableRow = styled(TableRow, {
    shouldForwardProp: (prop) => prop !== "isSelected",
})<{ isSelected: boolean }>(({ theme, isSelected }) => ({
    backgroundColor: isSelected
        ? theme.palette.action.selected
        : theme.palette.background.paper, // Màu nền khi được chọn
    cursor: "pointer", // Thay đổi con trỏ chuột khi hover
    "&:hover": {
        backgroundColor: isSelected
            ? theme.palette.action.selected // Nền khi được chọn
            : theme.palette.action.hover, // Nền khi hover
    },
    transition: "background-color 0.3s ease", // Hiệu ứng chuyển màu nền
}));

const icons: { [key: string]: React.ElementType } = {
    "audio/mpeg": Mp3Icon,
    "audio/x-wav": WavIcon,
    "audio/flac": FlacIcon,
};

const CoverFileItem: React.FC<ICoverFileItemProps> = ({
    file,
    isSelected,
    onSelect,
    onAddSecret,
    onDelete,
    onPlay,
}) => {
    const theme = useTheme();
    const { t } = useTranslation(); // Khai báo hàm t từ useTranslation
    const Icon = icons[file.type] || Mp3Icon;

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
                <Tooltip title={formatDuration(file.duration)}>
                    <Typography>{formatDuration(file.duration)}</Typography>
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
                    <Tooltip title={t("addSecret")}>
                        <IconButton onClick={onAddSecret}>
                            <AddIcon />
                        </IconButton>
                    </Tooltip>
                    <AudioPlay onPlay={onPlay} src={file.blob} id={file.id} />
                    <Tooltip title={t("deleteFile")}>
                        <IconButton onClick={onDelete}>
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                </Box>
            </TableCell>
        </StyledTableRow>
    );
};

export default CoverFileItem;
