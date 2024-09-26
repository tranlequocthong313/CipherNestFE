import React, { useState, useEffect, useRef } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import IconButton from "@mui/material/IconButton";
import { Box, Tooltip } from "@mui/material";
import { useCoverFile } from "../hooks/useCoverFile";
import { IAudioPlayProps } from "../interfaces/ICoverFile";
import { useTranslation } from "react-i18next"; // Import useTranslation
import useTheme from "../hooks/useTheme";

const AudioPlay: React.FC<IAudioPlayProps> = ({ src, id, onPlay }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const { onActionSelectedId } = useCoverFile();
    const { theme } = useTheme();
    const { t } = useTranslation(); // Khai báo hàm t từ useTranslation

    useEffect(() => {
        if (audioRef.current) {
            const audioElement = audioRef.current;

            // Handle the time update to update progress
            const updateProgress = () => {
                setCurrentTime(audioElement.currentTime);
                setDuration(audioElement.duration);
            };

            audioElement.addEventListener("timeupdate", updateProgress);
            audioElement.addEventListener("loadedmetadata", updateProgress);

            if (onActionSelectedId !== id) {
                audioElement.pause();
                audioElement.currentTime = 0; // Reset playback position
                setIsPlaying(false);
            }

            return () => {
                audioElement.removeEventListener("timeupdate", updateProgress);
                audioElement.removeEventListener("loadedmetadata", updateProgress);
            };
        }
    }, [src, onActionSelectedId, id]);

    const handleClick = (e: any) => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }

        onPlay?.(e);
    };

    const onEndAudio = () => {
        setIsPlaying(false);
    };

    return (
        <Box>
            <Tooltip title={isPlaying ? t("pause") : t("play")}>
                <IconButton onClick={handleClick}>
                    {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
                </IconButton>
            </Tooltip>
            <audio ref={audioRef} src={src} preload="auto" onEnded={onEndAudio} />
            {/* Progress bar */}
            {isPlaying && (
                <Box
                    sx={{
                        width: "100%",
                        height: "1px",
                        backgroundColor: "#ccc",
                    }}
                >
                    <Box
                        sx={{
                            width: `${(currentTime / duration) * 100}%`,
                            backgroundColor: theme.palette.primary.main,
                            height: "100%",
                        }}
                    />
                </Box>
            )}
        </Box>
    );
};

export default AudioPlay;
