import React, { FormEvent, FormEventHandler, useEffect, useState } from "react";
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
import { useCoverFileApi } from "../hooks/useCoverFile";
import { useSecretFileApi } from "../hooks/useSecretFile";
import { useEmbed, useEmbedApi } from "../hooks/useEmbed";
import { ALGORITHMS, DEBUG } from "../configs/constant";
import HTTP, { coverFileApis } from "../configs/api";

interface IEmbedModal {
    open: boolean;
    onClose: () => void;
}

const EmbedModal: React.FC<IEmbedModal> = ({ open, onClose }) => {
    const theme = useTheme();
    const { t } = useTranslation();
    const [algorithm, setAlgorithm] = useState("lsb");
    const [compressed, setCompressed] = useState(false);
    const [encrypted, setEncrypted] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [progress, setProgress] = useState(0); // Dummy value for progress
    const [remainingTime, setRemainingTime] = useState("00:00"); // Dummy value for remaining time
    const [passwordError, setPasswordError] = useState("");
    const { selectedCoverFile } = useCoverFileApi()
    const { secretFilesByCoverFile } = useSecretFileApi()
    const { outputQuality } = useEmbed()
    const { openLoading, closeLoading } = useEmbedApi()

    const handleStartEmbedding = async () => {
        const coverFile = selectedCoverFile()?.file
        if (!coverFile) {
            return
        }
        const secretFiles = secretFilesByCoverFile()
        if (!secretFiles || secretFiles.length === 0) {
            return
        }

        const form = new FormData()

        secretFiles.forEach((file, index) => {
            if (file.file) {
                form.append(`secret_files[${index}]`, file.file);
            }
        });

        form.append('cover_file', coverFile)
        form.append('output_quality', outputQuality)
        form.append('algorithm', algorithm)
        form.append('compressed', compressed.toString())

        if (password) {
            form.append('password', password)
        }

        if (DEBUG) {
            console.log(form)
        }

        try {
            openLoading()
            const res = await HTTP.post(coverFileApis.embed, form, {
                responseType: 'blob'
            })
            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement('a');
            link.href = url;

            const disposition = res.headers['content-disposition'];
            let filename = 'extracted_files.zip';

            if (disposition && disposition.indexOf('attachment') !== -1) {
                var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
                var matches = filenameRegex.exec(disposition);
                if (matches != null && matches[1]) {
                    filename = matches[1].replace(/['"]/g, '');
                }
            }

            link.setAttribute('download', filename);
            document.body.appendChild(link);
            link.click();

            link.parentNode?.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            if (DEBUG) {
                console.log('EMBED ERR:::', error)
            }
        } finally {
            closeLoading()
        }
    };


    useEffect(() => {
        if (open) {
            return
        }

        const resetStates = () => {
            setAlgorithm("lsb");
            setCompressed(false);
            setEncrypted(false);
            setPassword("");
            setConfirmPassword("");
            setProgress(0);
            setRemainingTime("00:00");
            setPasswordError("");
        }

        resetStates()
    }, [open])

    const handleAlgorithmChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAlgorithm(event.target.value);
    };

    const handleCompressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCompressed(event.target.checked);
    };

    const handleEncryptChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEncrypted(event.target.checked);
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

    return (
        <Dialog open={open} onClose={onClose} PaperProps={{ style: { backgroundColor: theme.palette.background.default } }} onKeyPress={(e) => e.key === 'Enter' && handleStartEmbedding()}>
            <DialogTitle>{t("steganography_options")}</DialogTitle>
            <DialogContent>
                <FormControl component="fieldset" fullWidth>
                    <FormLabel component="legend"
                        sx={{
                            color: "text.primary",
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
                        {Object.entries(ALGORITHMS).map(([k, v]) =>
                            <FormControlLabel
                                value={k.toLowerCase()}
                                control={<Radio />}
                                label={t(v)}
                            />
                        )}
                    </RadioGroup>
                </FormControl>
                <FormControl component="fieldset" fullWidth>
                    <FormLabel component="legend"
                        sx={{
                            color: "text.primary",
                            "&.MuiFormLabel-root": {
                                color: "text.primary",
                            },
                        }}
                    >{t("options")}</FormLabel>
                    <FormControlLabel
                        control={<Switch checked={compressed} onChange={handleCompressChange} />}
                        label={t("compress")}
                    />
                    <FormControlLabel
                        control={<Switch checked={encrypted} onChange={handleEncryptChange} />}
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
                            visibility: encrypted ? "visible" : "hidden",
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
                            visibility: encrypted ? "visible" : "hidden",
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
                        sx={{ height: 15, borderRadius: 5, mt: 1 }}
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
                    color="primary"
                    variant="contained"
                    sx={{
                        backgroundColor: theme.palette.primary.main,
                        "&:hover": {
                            backgroundColor: theme.palette.primary.dark,
                        },
                        boxShadow: 3,
                    }}
                    type='submit'
                >
                    {t("start_embedding")}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EmbedModal;
