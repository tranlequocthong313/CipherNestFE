import React, { useEffect, useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    useTheme,
    Typography
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useExtract } from "../hooks/useExtract";

interface IPasswordModalProps {
    open: boolean;
    onClose: () => void;
    onUnlock: (password: string) => void;
    title: string;
}

const PasswordModal: React.FC<IPasswordModalProps> = ({
    open,
    onClose,
    onUnlock,
    title
}) => {
    const theme = useTheme();
    const { t } = useTranslation();
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { isWrongPassword } = useExtract()

    useEffect(() => {
        if (isWrongPassword) {
            setError(t('wrongPassword'))
        }
    }, [isWrongPassword])

    const handleUnlock = () => {
        if (password) {
            onUnlock(password);
            onClose();
            setPassword('')
        } else {
            setError(t("passwordRequired"));
        }
    };

    const close = () => {
        onClose()
        setPassword('')
    }

    return (
        <Dialog open={open} onClose={onClose} PaperProps={{ style: { backgroundColor: theme.palette.background.paper } }}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label={t("password")}
                    type="password"
                    fullWidth
                    variant="outlined"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                        setError(""); // Clear error on change
                    }}
                    helperText={error}
                    error={!!error}
                />
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={close}
                    color="inherit" // Use 'inherit' to match theme color
                    variant="outlined" // Use outlined variant for a subdued look
                >
                    {t("cancel")}
                </Button>
                <Button
                    onClick={handleUnlock}
                    color="primary" // Use primary color to make it stand out
                    variant="contained" // Use contained variant for a more prominent button
                    sx={{
                        ml: 2 // Add margin to separate the buttons
                    }}
                >
                    {t("ok")}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default PasswordModal;
