import React, { useEffect, useState } from "react";
import { Box, Button, Tooltip, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EmbedIcon from "@mui/icons-material/Download";
import ExtractIcon from "@mui/icons-material/Upload";
import useTheme from "../hooks/useTheme";
import { useCoverFileApi, useCoverFileDispatch } from "../hooks/useCoverFile";
import { v4 as uuid } from "uuid";
import { getDuration } from "../utils/audio";
import { useTranslation } from "react-i18next";
import { isValidFile } from "../utils/validator";
import EmbedModal from "./EmbedModal";
import { ICoverFile } from "../interfaces/ICoverFile";
import HTTP, { coverFileApis, embeddedFileApis } from "../configs/api";
import { useEmbed, useEmbedApi, useEmbedDispatch } from "../hooks/useEmbed";
import { useSecretFile, useSecretFileDispatch } from "../hooks/useSecretFile";
import { DEBUG, EXTENSION_OF_SUPPORTED_AUDIO_FORMATS } from "../configs/constant";
import useDownload from "../hooks/useDownload";

const CoverFileToolbar: React.FC = () => {
    const { theme } = useTheme();
    const dispatchCoverFiles = useCoverFileDispatch();
    const { t } = useTranslation();
    const [openModal, setOpenModal] = useState(false);
    const { outputQuality } = useEmbed()
    const { updateEmbedStatus } = useEmbedApi()
    const { selectedCoverFile } = useCoverFileApi()
    const { embeddedFiles, totalSecretFileSize } = useSecretFile()
    const { openLoading, closeLoading } = useEmbedApi()
    const dispatchSecretFile = useSecretFileDispatch()
    const download = useDownload()

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
                    let duration = null
                    try {
                        duration = await getDuration(file);
                    } catch (error) {
                    }
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

            dispatchSecretFile({
                type: 'SELECT_COVER_FILE',
                payload: { coverFileId: validFiles[0].id },
            });

            await updateEmbedStatus({ coverFile: validFiles[0] })
        }
    };

    const extractData = async () => {
        const form = new FormData();
        const embeddedFile = selectedCoverFile();
        if (!embeddedFile || !embeddedFile.file || !embeddedFile.isEmbedded) {
            return;
        }
        form.append('embedded_file', embeddedFile.file);
        if (embeddedFile.password) {
            form.append('password', embeddedFile.password);
        }
        if (DEBUG) {
            console.log("EXTRACT::", form)
        }
        try {
            openLoading()
            await download(embeddedFileApis.extract, form, 'extracted_files.zip')
        } catch (error) {
            if (DEBUG) {
                console.log('EXTRACT ERR:::', error);
            }
        } finally {
            closeLoading()
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
                accept={EXTENSION_OF_SUPPORTED_AUDIO_FORMATS.join(',')}
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
                    disabled={selectedCoverFile()?.isEmbedded || embeddedFiles.length > 0 || totalSecretFileSize <= 0}
                    sx={{
                        backgroundColor: selectedCoverFile()?.isEmbedded || embeddedFiles.length > 0 || totalSecretFileSize <= 0 ? theme.palette.action.disabled : theme.palette.background.paper,
                        "&:hover": {
                            backgroundColor: selectedCoverFile()?.isEmbedded || embeddedFiles.length > 0 || totalSecretFileSize <= 0 ? theme.palette.action.disabledBackground : theme.palette.action.selected,
                        },
                        borderRadius: 2,
                        textTransform: "none",
                        display: {
                            xs: "none",
                            sm: "flex",
                        },
                        mr: 1,
                        color: selectedCoverFile()?.isEmbedded || embeddedFiles.length > 0 || totalSecretFileSize <= 0 ? theme.palette.text.disabled : theme.palette.text.primary,
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
                    disabled={!selectedCoverFile()?.isEmbedded || embeddedFiles.length <= 0}
                    onClick={extractData}
                    sx={{
                        backgroundColor: !selectedCoverFile()?.isEmbedded || embeddedFiles.length <= 0 ? theme.palette.action.disabled : theme.palette.background.paper,
                        "&:hover": {
                            backgroundColor: !selectedCoverFile()?.isEmbedded || embeddedFiles.length <= 0 ? theme.palette.action.disabledBackground : theme.palette.action.selected,
                        },
                        borderRadius: 2,
                        textTransform: "none",
                        display: {
                            xs: "none",
                            sm: "flex",
                        },
                        color: !selectedCoverFile()?.isEmbedded || embeddedFiles.length <= 0 ? theme.palette.text.disabled : theme.palette.text.primary,
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
