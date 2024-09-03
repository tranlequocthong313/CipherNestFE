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
import { useSecretFileDispatch } from "../hooks/useSecretFile";
import { useCoverFile } from "../hooks/useCoverFile";

const SecretFileToolbar = () => {
    const { t } = useTranslation();
    const { outputQuality, freeSpace, usedPercentage } = useEmbed()
    const dispatchEmbed = useEmbedDispatch()
    const dispatchSecretFile = useSecretFileDispatch()
    const coverFileState = useCoverFile();

    const onChangeQuality = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedValue = event.target.value;

        dispatchEmbed({
            type: 'CHANGE_OUTPUT_QUALITY',
            payload: {
                outputQuality: selectedValue
            }
        });
        dispatchSecretFile({
            type: 'DELETE_ALL',
        })
    };

    return (
        <Toolbar
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: 'center',
                mb: 2,
                bgcolor: "background.paper",
                p: 2,
                flexDirection: {
                    xs: 'column',
                    sm: 'row'
                }
            }}
        >
            {/* Options Output Quality */}
            <FormControl component="fieldset" sx={{ mb: { xs: 3, sm: 0 } }}>
                <FormLabel
                    component="legend"
                    sx={{
                        color: "text.primary",
                        // Thêm style để đảm bảo không bị thay đổi khi chọn radio button
                        "&.MuiFormLabel-root": {
                            color: "text.primary",
                        },
                    }}
                >
                    {t("outputQuality")}
                </FormLabel>
                <RadioGroup
                    row
                    value={outputQuality}
                    aria-label="output quality"
                    name="output-quality"
                    onChange={onChangeQuality}
                >
                    {
                        Object.values(OUTPUT_QUALITIES).map(quality =>
                            <FormControlLabel
                                key={quality}
                                value={quality}
                                control={<Radio color="primary" />}
                                label={t(quality)}
                            />
                        )
                    }
                </RadioGroup>
            </FormControl>

            {/* Free Space Progress Bar */}
            <Box sx={{ minWidth: 200 }}>
                <Typography
                    variant="body2"
                    color="text.primary"
                    sx={{ mb: 1 }}
                >
                    {t("freeSpaceForSecretFile")}: {formatFileSize(freeSpace)}
                </Typography>
                <LinearProgress
                    variant="determinate"
                    value={usedPercentage}
                    sx={{
                        height: 20,
                        borderRadius: 5,
                        bgcolor: "action.selected",
                        "& .MuiLinearProgress-bar": {
                            bgcolor: "primary.main",
                        },
                    }}
                />
                <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ mt: 1, display: "block", textAlign: "right" }}
                >
                    {formatPercentage(usedPercentage)}
                </Typography>
            </Box>
        </Toolbar>
    );
};

export default SecretFileToolbar;
