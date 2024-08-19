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

const SecretFileToolbar = () => {
    const { t } = useTranslation();

    // Giả sử phần trăm trống còn lại là 70%, bạn có thể tính toán từ dữ liệu thực tế
    const freeSpacePercentage = 70;

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
                    defaultValue="normal"
                    aria-label="output quality"
                    name="output-quality"
                >
                    <FormControlLabel
                        value="low"
                        control={<Radio color="primary" />}
                        label={t("low")}
                    />
                    <FormControlLabel
                        value="normal"
                        control={<Radio color="primary" />}
                        label={t("normal")}
                    />
                    <FormControlLabel
                        value="high"
                        control={<Radio color="primary" />}
                        label={t("high")}
                    />
                </RadioGroup>
            </FormControl>

            {/* Free Space Progress Bar */}
            <Box sx={{ minWidth: 200 }}>
                <Typography
                    variant="body2"
                    color="text.primary"
                    sx={{ mb: 1 }}
                >
                    {t("freeSpaceForSecretFile")}: 21.5 MB
                </Typography>
                <LinearProgress
                    variant="determinate"
                    value={freeSpacePercentage}
                    sx={{
                        height: 10,
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
                    {freeSpacePercentage}%
                </Typography>
            </Box>
        </Toolbar>
    );
};

export default SecretFileToolbar;
