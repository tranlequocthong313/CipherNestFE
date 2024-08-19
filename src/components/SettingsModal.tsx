import React, { useState, useEffect } from "react";
import {
    Modal,
    Box,
    Typography,
    Button,
    FormControl,
    Select,
    MenuItem,
    Switch,
    SelectChangeEvent,
    FormControlLabel,
} from "@mui/material";
import useTheme from "../hooks/useTheme";
import { useTranslation } from "react-i18next";
import { ISettingsModalProps } from "../interfaces/ISetting";

const SettingsModal: React.FC<ISettingsModalProps> = ({ open, onClose }) => {
    const { theme, handleModeChange, mode } = useTheme();
    const [language, setLanguage] = useState<string>("en");
    const { t, i18n } = useTranslation();

    useEffect(() => {
        // Load saved settings from localStorage
        const savedLanguage = localStorage.getItem("language") || "en";
        setLanguage(savedLanguage);
        i18n.changeLanguage(savedLanguage); // Apply saved language
    }, [i18n]);

    const onModeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newMode = event.target.checked ? "dark" : "light";
        handleModeChange(newMode);
    };

    const handleLanguageChange = (event: SelectChangeEvent) => {
        const newLanguage = event.target.value as string;
        setLanguage(newLanguage);
        localStorage.setItem("language", newLanguage); // Save language to localStorage
        i18n.changeLanguage(newLanguage); // Change language
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    width: { xs: 380, sm: 460 },
                    p: 4,
                    backgroundColor: theme.palette.background.paper,
                    m: "auto",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -70%)", // Căn giữa theo cả hai chiều
                }}
            >
                <Typography variant="h5">{t("settings.title")}</Typography>
                <Box sx={{ mt: 2 }}>
                    <Typography sx={{ mt: 4, fontWeight: "bold" }}>
                        {t("settings.themeMode")}
                    </Typography>
                    <FormControl fullWidth>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={mode === "dark"}
                                    onChange={onModeChange}
                                    name="themeMode"
                                    color="primary"
                                />
                            }
                            label={<Typography>{t("settings.darkMode")}</Typography>}
                            labelPlacement="start" // Đặt label nằm ngang bên trái switch
                            sx={{ mr: "auto", ml: 1, mt: 1 }}
                        />
                    </FormControl>
                </Box>
                <Typography sx={{ mt: 4, fontWeight: "bold" }}>
                    {t("settings.language")}
                </Typography>
                <Box sx={{ mt: 2, ml: 1 }}>
                    <FormControl fullWidth>
                        <Select value={language} onChange={handleLanguageChange}>
                            <MenuItem value="en">{t("languages.english")}</MenuItem>
                            <MenuItem value="vi">{t("languages.vietnamese")}</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <Box sx={{ mt: 3, textAlign: "right" }}>
                    <Button onClick={onClose} variant="contained">
                        {t("settings.close")}
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default SettingsModal;
