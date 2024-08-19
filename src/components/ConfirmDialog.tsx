import React, { useState } from 'react';
import {
  TableRow,
  TableCell,
  IconButton,
  Typography,
  Tooltip,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Button,
} from '@mui/material';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import WavesIcon from '@mui/icons-material/Waves';
import GraphicEq from '@mui/icons-material/GraphicEq';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/system';
import { ICoverFile, ICoverFileItemProps } from '../interfaces/ICoverFile';
import {
  formatDateTime,
  formatDuration,
  formatFileSize,
} from '../utils/formatter';
import { SvgIconComponent } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles'; // Updated import
import AudioPlay from './AudioPlay';
import { useTranslation } from 'react-i18next'; // Import useTranslation

interface IConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  cancel: string;
  confirm: string;
  onClose: () => void;
  onCancel: () => void;
  onConfirm: () => void;
}

const ConfirmDialog: React.FC<IConfirmDialogProps> = ({
  open,
  title,
  message,
  cancel,
  confirm,
  onClose,
  onCancel,
  onConfirm,
}) => {
  const theme = useTheme();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby='confirm-delete-dialog-title'
      aria-describedby='confirm-delete-dialog-description'
    >
      <DialogTitle id='confirm-delete-dialog-title'>
        {title} {/* Ví dụ: "Xác nhận xóa" */}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id='confirm-delete-dialog-description'>
          {message} {/* Ví dụ: "Bạn có chắc chắn muốn xóa tệp này không?" */}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          sx={{
            color: theme.palette.text.secondary,
            backgroundColor: theme.palette.background.default,
          }}
        >
          {cancel} {/* Ví dụ: "Hủy" */}
        </Button>
        <Button
          onClick={onConfirm}
          sx={{
            color: theme.palette.primary.main,
            backgroundColor: theme.palette.background.default,
          }}
          autoFocus
        >
          {confirm} {/* Ví dụ: "Xóa" */}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
