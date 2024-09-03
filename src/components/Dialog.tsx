import React, { useState } from 'react';
import {
    TableRow,
    TableCell,
    IconButton,
    Typography,
    Tooltip,
    Box,
    Dialog as MUIDialog,
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

interface IDialogProps {
    open: boolean;
    title: string;
    message: string;
    secondary?: string;
    primary?: string;
    onClose: () => void;
    onSecondary?: () => void;
    onPrimary?: () => void;
}

const Dialog: React.FC<IDialogProps> = ({
    open,
    title,
    message,
    secondary,
    primary,
    onClose,
    onSecondary,
    onPrimary,
}) => {
    const theme = useTheme();
    const { t } = useTranslation();

    return (
        <MUIDialog
            open={open}
            onClose={onClose}
            aria-labelledby='confirm-delete-dialog-title'
            aria-describedby='confirm-delete-dialog-description'
        >
            <DialogTitle id='confirm-delete-dialog-title'>
                {title || t('title')}
            </DialogTitle>

            {message &&
                <DialogContent>
                    <DialogContentText id='confirm-delete-dialog-description'>
                        {message || t('message')}
                    </DialogContentText>
                </DialogContent>
            }

            {(onPrimary || onSecondary) &&
                <DialogActions>
                    {onSecondary &&
                        <Button
                            onClick={onSecondary}
                            sx={{
                                color: theme.palette.text.secondary,
                                backgroundColor: theme.palette.background.default,
                            }}
                        >
                            {secondary || t("cancel")}
                        </Button>
                    }
                    {
                        onPrimary &&
                        <Button
                            onClick={onPrimary}
                            sx={{
                                color: theme.palette.primary.main,
                                backgroundColor: theme.palette.background.default,
                            }}
                            autoFocus
                        >
                            {primary || t("confirm")}
                        </Button>
                    }
                </DialogActions>
            }
        </MUIDialog>
    );
};

export default Dialog;
