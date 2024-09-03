import React, { useState } from "react";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
    Switch,
    Typography,
    LinearProgress,
    Button,
    Box,
    TextField,
    useTheme,
} from "@mui/material";
import { useTranslation } from "react-i18next";

interface IEmbedModal {
    open: boolean;
    onClose: () => void;
}

const EmbedModal: React.FC<IEmbedModal> = ({ open, onClose }) => {
    const theme = useTheme();
    const { t } = useTranslation();
    const [algorithm, setAlgorithm] = useState("lsb");
    const [encrypt, setEncrypt] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [progress, setProgress] = useState(0); // Dummy value for progress
    const [remainingTime, setRemainingTime] = useState("00:00"); // Dummy value for remaining time
    const [passwordError, setPasswordError] = useState("");

    const handleAlgorithmChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAlgorithm(event.target.value);
    };

    const handleEncryptChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEncrypt(event.target.checked);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
        validatePasswords(event.target.value, confirmPassword);
    };

    const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(event.target.value);
        validatePasswords(password, event.target.value);
    };

    const validatePasswords = (password: string, confirmPassword: string) => {
        if (password && confirmPassword && password !== confirmPassword) {
            setPasswordError(t("password_mismatch"));
        } else {
            setPasswordError("");
        }
    };

    const handleStartEmbedding = () => {
        // Implement embedding logic here
        console.log("Embedding started with options:", { algorithm, encrypt, password });
    };

    return (
        <Dialog open={open} onClose={onClose} PaperProps={{ style: { backgroundColor: theme.palette.background.default } }}>
            <DialogTitle>{t("steganography_options")}</DialogTitle>
            <DialogContent>
                <FormControl component="fieldset" fullWidth>
                    <FormLabel component="legend"
                        sx={{
                            color: "text.primary",
                            // Thêm style để đảm bảo không bị thay đổi khi chọn radio button
                            "&.MuiFormLabel-root": {
                                color: "text.primary",
                            },
                        }}
                    >{t("algorithm")}</FormLabel>
                    <RadioGroup
                        value={algorithm}
                        onChange={handleAlgorithmChange}
                        sx={{
                            "& .MuiFormControlLabel-root": {
                                marginRight: 2,
                                "&:hover": {
                                    backgroundColor: "transparent",
                                },
                                "& .MuiRadio-root": {
                                    "&:hover": {
                                        backgroundColor: "transparent",
                                    },
                                },
                            },
                        }}
                    >
                        <FormControlLabel
                            value="lsb"
                            control={<Radio />}
                            label={t("LSB")}
                        />
                        <FormControlLabel
                            value="amplitude"
                            control={<Radio />}
                            label={t("Amplitude Coding")}
                        />
                        <FormControlLabel
                            value="echo"
                            control={<Radio />}
                            label={t("Echo Hiding")}
                        />
                        <FormControlLabel
                            value="spread"
                            control={<Radio />}
                            label={t("Spread Spectrum")}
                        />
                    </RadioGroup>
                </FormControl>
                <FormControl component="fieldset" fullWidth>
                    <FormLabel component="legend"
                        sx={{
                            color: "text.primary",
                            // Thêm style để đảm bảo không bị thay đổi khi chọn radio button
                            "&.MuiFormLabel-root": {
                                color: "text.primary",
                            },
                        }}
                    >{t("options")}</FormLabel>
                    <FormControlLabel
                        control={<Switch checked={encrypt} onChange={handleEncryptChange} />}
                        label={t("encrypt")}
                    />
                    <TextField
                        label={t("password")}
                        type="password"
                        fullWidth
                        value={password}
                        onChange={handlePasswordChange}
                        sx={{
                            mt: 2,
                            visibility: encrypt ? "visible" : "hidden",
                            "& .MuiInputLabel-root": {
                                color: theme.palette.text.secondary,
                            },
                            "& .MuiOutlinedInput-root": {
                                "& fieldset": {
                                    borderColor: theme.palette.text.secondary,
                                },
                                "&:hover fieldset": {
                                    borderColor: theme.palette.primary.main,
                                },
                                "&.Mui-focused fieldset": {
                                    borderColor: theme.palette.primary.main,
                                },
                            },
                        }}
                        error={!!passwordError}
                        helperText={passwordError}
                    />
                    <TextField
                        label={t("confirm_password")}
                        type="password"
                        fullWidth
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        sx={{
                            mt: 2,
                            visibility: encrypt ? "visible" : "hidden",
                            "& .MuiInputLabel-root": {
                                color: theme.palette.text.secondary,
                            },
                            "& .MuiOutlinedInput-root": {
                                "& fieldset": {
                                    borderColor: theme.palette.text.secondary,
                                },
                                "&:hover fieldset": {
                                    borderColor: theme.palette.primary.main,
                                },
                                "&.Mui-focused fieldset": {
                                    borderColor: theme.palette.primary.main,
                                },
                            },
                        }}
                        error={!!passwordError}
                        helperText={passwordError}
                    />
                </FormControl>
                <Box sx={{ mt: 2 }}>
                    <Typography variant="body2">{t("progress")}: {progress}%</Typography>
                    <LinearProgress
                        variant="determinate"
                        value={progress}
                        sx={{ height: 15, borderRadius: 5, mt: 1 }} // Tăng chiều cao thanh tiến độ
                    />
                    <Typography variant="caption" sx={{ mt: 1 }}>{t("remaining_time")}: {remainingTime}</Typography>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={onClose}
                    sx={{
                        color: theme.palette.text.disabled,
                        backgroundColor: theme.palette.action.hover,
                        "&:hover": {
                            backgroundColor: theme.palette.action.selected,
                        },
                    }}
                >
                    {t("cancel")}
                </Button>
                <Button
                    onClick={handleStartEmbedding}
                    color="primary"
                    variant="contained"
                    sx={{
                        backgroundColor: theme.palette.primary.main,
                        "&:hover": {
                            backgroundColor: theme.palette.primary.dark,
                        },
                        boxShadow: 3,
                    }}
                >
                    {t("start_embedding")}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EmbedModal;
