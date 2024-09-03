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
import { useCoverFileDispatch } from "../hooks/useCoverFile";

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
    const [openConfirm, setOpenConfirm] = useState(false);
    const [openPasswordModal, setOpenPasswordModal] = useState(false);
    const dispatchCoverFile = useCoverFileDispatch()

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

    const handleOpenPasswordModal = () => {
        // setOpenPasswordModal(true);
        onSelect()
    };

    const handleClosePasswordModal = () => {
        setOpenPasswordModal(false);
    };

    const handleUnlock = (password: string) => {
        // Handle password unlock logic here
        console.log("Unlocking with password:", password);
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
                onClick={handleOpenPasswordModal}
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
                        <Tooltip title={t("addSecret")}>
                            <IconButton onClick={onAddSecret}>
                                <AddIcon />
                            </IconButton>
                        </Tooltip>
                        <AudioPlay onPlay={e => {
                            e.stopPropagation()
                            onActionSelect(file.id)
                            if (onPlay) {
                                onPlay()
                            }
                        }} src={file.blob} id={file.id} />
                        <Tooltip title={t("deleteFile")}>
                            <IconButton
                                onClick={(e) => {
                                    e.stopPropagation(); // Ngăn chặn sự kiện onClick lan truyền
                                    onActionSelect(file.id)
                                    handleOpenConfirm();
                                }}
                            >
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
            </StyledTableRow >

            <PasswordModal
                open={openPasswordModal}
                onClose={handleClosePasswordModal}
                onUnlock={handleUnlock}
                fileName={file.name}
            />
        </>
    );
};

export default CoverFileItem;
