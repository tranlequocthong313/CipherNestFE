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
import useDownload from "../hooks/useDownload";

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
    const [passwordError, setPasswordError] = useState("");
    const { selectedCoverFile } = useCoverFileApi()
    const { secretFilesByCoverFile } = useSecretFileApi()
    const { outputQuality } = useEmbed()
    const { openLoading, closeLoading } = useEmbedApi()
    const download = useDownload()

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
            console.log("EMBED:::", form)
        }

        try {
            openLoading()
            await download(coverFileApis.embed, form, coverFile.name)
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
                                key={k}
                                value={k.toLowerCase()}
                                control={<Radio />}
                                label={t(v)}
                            />
                        )}
                    </RadioGroup>
                </FormControl>
                <FormControl component="fieldset" fullWidth sx={{ mt: 2 }}>
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
                    type='submit'
                >
                    {t("start_embedding")}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EmbedModal;
