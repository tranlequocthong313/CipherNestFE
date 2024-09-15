import React, { useState } from "react";
import { Box, Button, Tooltip, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EmbedIcon from "@mui/icons-material/Download";
import ExtractIcon from "@mui/icons-material/Upload";
import useTheme from "../hooks/useTheme";
import { useCoverFileDispatch } from "../hooks/useCoverFile";
import { v4 as uuid } from "uuid";
import { getDuration } from "../utils/audio";
import { useTranslation } from "react-i18next";
import { isValidFile } from "../utils/validator";
import EmbedModal from "./EmbedModal";
import { ICoverFile } from "../interfaces/ICoverFile";
import HTTP, { coverFileApis } from "../configs/api";
import { useEmbed, useEmbedApi, useEmbedDispatch } from "../hooks/useEmbed";

const CoverFileToolbar: React.FC = () => {
    const { theme } = useTheme();
    const dispatchCoverFiles = useCoverFileDispatch();
    const { t } = useTranslation(); 
    const [openModal, setOpenModal] = useState(false);
    const { outputQuality } = useEmbed()
    const { updateEmbedStatus } = useEmbedApi()

    const handleFileUpload = async (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const files = event.target.files;
        if (files) {
            const newFileArray = await Promise.all(
                Array.from(files).map(async (file) => {
                    if (!isValidFile(file)) {
                        return null; 
                    }
                    const duration = await getDuration(file);
                    return {
                        name: file.name,
                        lastModified: file.lastModified,
                        path: file.webkitRelativePath,
                        size: file.size,
                        type: file.type,
                        id: uuid(), 
                        blob: URL.createObjectURL(file),
                        duration: duration,
                        file: file
                    };
                }),
            );

            const validFiles = newFileArray.filter(
                (file): file is NonNullable<typeof file> => file !== null,
            );

            dispatchCoverFiles({
                type: "ADD",
                payload: { files: validFiles },
            });

            await updateEmbedStatus({ coverFile: validFiles[0] })
        }
    };

    return (
        <Box
            sx={{
                position: "fixed",
                top: 64,
                left: 45,
                right: 45,
                backgroundColor: theme.palette.background.paper,
                boxShadow: 3,
                p: 2,
                pt: 4,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                zIndex: 1200,
            }}
        >
            <input
                accept=".wav,.mp3,.flac"
                style={{ display: "none" }}
                id="upload-music-file"
                type="file"
                onChange={handleFileUpload}
                multiple
            />
            <label htmlFor="upload-music-file">
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    component="span"
                    sx={{
                        backgroundColor: theme.palette.primary.main,
                        "&:hover": {
                            backgroundColor: theme.palette.action.selected,
                        },
                        borderRadius: 2,
                        textTransform: "none",
                        display: {
                            xs: "none", 
                            sm: "flex",
                        },
                    }}
                >
                    {t("add_cover_file")}
                </Button>
                <Tooltip title={t("add_cover_file_tooltip")}>
                    <IconButton
                        color="primary"
                        component="span"
                        sx={{
                            backgroundColor: theme.palette.primary.main,
                            "&:hover": {
                                backgroundColor: theme.palette.action.selected,
                            },
                            borderRadius: 2,
                            display: {
                                xs: "flex",
                                sm: "none",
                            },
                        }}
                    >
                        <AddIcon sx={{ color: theme.palette.background.default }} />
                    </IconButton>
                </Tooltip>
            </label>

            <Box sx={{ display: "flex", alignItems: "center" }}>
                <Button
                    onClick={() => setOpenModal(true)}
                    variant="outlined"
                    startIcon={<EmbedIcon />}
                    sx={{
                        backgroundColor: theme.palette.background.paper,
                        "&:hover": {
                            backgroundColor: theme.palette.action.selected,
                        },
                        borderRadius: 2,
                        textTransform: "none",
                        display: {
                            xs: "none", 
                            sm: "flex",
                        },
                        mr: 1,
                        color: theme.palette.text.primary,
                    }}
                >
                    {t("embed")}
                </Button>
                <Tooltip title={t("embed_tooltip")}>
                    <IconButton
                        onClick={() => setOpenModal(true)}
                        color="primary"
                        sx={{
                            backgroundColor: theme.palette.primary.main,
                            "&:hover": {
                                backgroundColor: theme.palette.action.selected,
                            },
                            borderRadius: 2,
                            display: {
                                xs: "flex",
                                sm: "none",
                            },
                            mx: 0.5,
                        }}
                    >
                        <EmbedIcon sx={{ color: theme.palette.background.default }} />
                    </IconButton>
                </Tooltip>
                <Button
                    variant="outlined"
                    startIcon={<ExtractIcon />}
                    sx={{
                        backgroundColor: theme.palette.background.paper,
                        "&:hover": {
                            backgroundColor: theme.palette.action.selected,
                        },
                        borderRadius: 2,
                        textTransform: "none",
                        display: {
                            xs: "none", 
                            sm: "flex",
                        },
                        color: theme.palette.text.primary,
                    }}
                >
                    {t("extract")}
                </Button>
                <Tooltip title={t("extract_tooltip")}>
                    <IconButton
                        color="primary"
                        sx={{
                            backgroundColor: theme.palette.primary.main,
                            "&:hover": {
                                backgroundColor: theme.palette.action.selected,
                            },
                            borderRadius: 2,
                            display: {
                                xs: "flex",
                                sm: "none",
                            },
                            mx: 0.5,
                        }}
                    >
                        <ExtractIcon sx={{ color: theme.palette.background.default }} />
                    </IconButton>
                </Tooltip>
            </Box>

            <EmbedModal open={openModal} onClose={() => setOpenModal(false)} />
        </Box>
    );
};

export default CoverFileToolbar;
