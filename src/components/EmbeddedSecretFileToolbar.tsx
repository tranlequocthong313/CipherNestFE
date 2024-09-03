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
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    FormLabel,
    Toolbar,
    LinearProgress,
    Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useEmbed, useEmbedDispatch } from "../hooks/useEmbed";
import { OUTPUT_QUALITIES } from "../configs/constant";
import { formatFileSize, formatPercentage } from "../utils/formatter";
import { useSecretFile, useSecretFileDispatch } from "../hooks/useSecretFile";
import { useCoverFile } from "../hooks/useCoverFile";

const EmbeddedSecretFileToolbar: React.FC = () => {
    const { t } = useTranslation();
    const { totalEmbeddedSecretFileSize, embeddedFiles } = useSecretFile();

    return (
        <Toolbar
            sx={{
                display: 'flex',
                alignItems: 'center',
                mb: 2,
                bgcolor: 'background.paper',
                p: 2,
                flexDirection: {
                    xs: 'column',
                    sm: 'row'
                }
            }}
        >
            <Typography variant="subtitle1" sx={{ flexGrow: 1 }}>
                {t('numberOfHiddenFiles')}: {embeddedFiles.length}
            </Typography>
            <Typography variant="subtitle1" sx={{ flexGrow: 1 }}>
                {t('totalHiddenFileSize')}: {formatFileSize(totalEmbeddedSecretFileSize)} 
            </Typography>
        </Toolbar>
    );
};

export default EmbeddedSecretFileToolbar;
