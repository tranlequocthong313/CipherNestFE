import React, { useState } from "react";
import {
    TableRow,
    TableCell,
    IconButton,
    Typography,
    Tooltip,
    Box,
    DialogTitle,
    DialogContent,
    DialogActions,
    DialogContentText,
    Button
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
import Dialog from './Dialog'
import PasswordModal from "./PasswordModal";
import { useCoverFileApi, useCoverFileDispatch } from "../hooks/useCoverFile";
import { useExtract, useExtractDispatch } from "../hooks/useExtract";
import { MIME_TYPE_OF_SUPPORTED_AUDIO_FORMATS } from "../configs/constant";

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
    const { t } = useTranslation();
    const Icon = icons[file.type] || Mp3Icon;
    const [openConfirm, setOpenConfirm] = useState(false);
    const dispatchCoverFile = useCoverFileDispatch()
    const dispatchExtract = useExtractDispatch()
    const { selectedCoverFile } = useCoverFileApi()

    const handleOpenConfirm = () => {
        setOpenConfirm(true);
    };

    const handleCloseConfirm = () => {
        setOpenConfirm(false);
    };

    const handleConfirmDelete = () => {
        onDelete();
        handleCloseConfirm();
    };

    const handleClosePasswordModal = () => {
        dispatchExtract({
            type: 'CLOSE_PASSWORD_MODAL'
        })
    };

    const onActionSelect = (id: string) => {
        dispatchCoverFile({
            type: "ON_ACTION_SELECT",
            payload: { id }
        })
    }

    return (
        <>
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
                    <Tooltip title={file.version}>
                        <Typography>{file.version ? `v${file.version}` : '-'}</Typography>
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
                        {!file.isEmbedded &&
                            <Tooltip title={t("addSecret")}>
                                <IconButton onClick={onAddSecret}>
                                    <AddIcon />
                                </IconButton>
                            </Tooltip>
                        }
                        {
                            MIME_TYPE_OF_SUPPORTED_AUDIO_FORMATS.includes(file.type) &&
                            <AudioPlay onPlay={e => {
                                e.stopPropagation()
                                onActionSelect(file.id)
                                if (onPlay) {
                                    onPlay()
                                }
                            }} src={file.blob} id={file.id} />
                        }
                        <Tooltip title={t("deleteFile")}>
                            <IconButton
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onActionSelect(file.id)
                                    handleOpenConfirm();
                                }}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </TableCell>
            </StyledTableRow >
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
        </>
    );
};

export default CoverFileItem;
