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
        <Dialog open={open} onClose={onClose} PaperProps={{ style: { backgroundColor: theme.palette.background.paper } }} onKeyPress={(e) => e.key === 'Enter' && handleUnlock()}>
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
                        setError(""); 
                    }}
                    helperText={error}
                    error={!!error}
                />
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={close}
                    color="inherit" 
                    variant="outlined" 
                >
                    {t("cancel")}
                </Button>
                <Button
                    onClick={handleUnlock}
                    color="primary" 
                    variant="contained" 
                    sx={{
                        ml: 2 
                    }}
                >
                    {t("ok")}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default PasswordModal;
