import React from 'react';
import { Box, Button, Tooltip, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EmbedIcon from '@mui/icons-material/Download';
import ExtractIcon from '@mui/icons-material/Upload';
import useTheme from '../hooks/useTheme';

const Toolbar: React.FC = () => {
    const { theme } = useTheme();

    return (
        <Box
            sx={{
                position: 'fixed',
                top: 80,
                left: 45,
                right: 45,
                backgroundColor: theme.palette.background.paper,
                boxShadow: 3,
                p: 1,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                zIndex: 1200,
            }}
        >
            <Button
                variant="contained"
                startIcon={<AddIcon />}
                sx={{
                    backgroundColor: theme.palette.primary.main,
                    '&:hover': {
                        backgroundColor: theme.palette.action.hover,
                    },
                    borderRadius: 2,
                    textTransform: 'none',
                    display: {
                        xs: 'none',  // Ẩn button trên màn hình nhỏ
                        sm: 'flex',  // Hiển thị button trên màn hình lớn
                    },
                }}
            >
                Add Cover File
            </Button>
            <Tooltip title="Add Cover File">
                <IconButton
                    color="primary"
                    sx={{
                        backgroundColor: theme.palette.primary.main, // Màu nền của nút theo theme
                        '&:hover': {
                            backgroundColor: theme.palette.action.hover, // Màu nền khi hover
                        },
                        borderRadius: 2,
                        display: {
                            xs: 'flex',
                            sm: 'none'
                        }
                    }}
                >
                    <AddIcon sx={{ color: theme.palette.background.default }} />
                </IconButton>
            </Tooltip>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Button
                    variant="outlined"
                    startIcon={<EmbedIcon />}
                    sx={{
                        backgroundColor: theme.palette.background.paper,
                        '&:hover': {
                            backgroundColor: theme.palette.action.hover,
                        },
                        borderRadius: 2,
                        textTransform: 'none',
                        display: {
                            xs: 'none',  // Ẩn button trên màn hình nhỏ
                            sm: 'flex',  // Hiển thị button trên màn hình lớn
                        },
                        mr: 1,
                        color: theme.palette.text.primary,
                    }}
                >
                    Embed
                </Button>
                <Tooltip title="Embed">
                    <IconButton
                        color="primary"
                        sx={{
                            backgroundColor: theme.palette.primary.main, // Màu nền của nút theo theme
                            '&:hover': {
                                backgroundColor: theme.palette.action.hover, // Màu nền khi hover
                            },
                            borderRadius: 2,
                            display: {
                                xs: 'flex',
                                sm: 'none'
                            },
                            mx: 0.5
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
                        '&:hover': {
                            backgroundColor: theme.palette.action.hover,
                        },
                        borderRadius: 2,
                        textTransform: 'none',
                        display: {
                            xs: 'none',  // Ẩn button trên màn hình nhỏ
                            sm: 'flex',  // Hiển thị button trên màn hình lớn
                        },
                        color: theme.palette.text.primary
                    }}
                >
                    Extract
                </Button>
                <Tooltip title="Extract">
                    <IconButton
                        color="primary"
                        sx={{
                            backgroundColor: theme.palette.primary.main, // Màu nền của nút theo theme
                            '&:hover': {
                                backgroundColor: theme.palette.action.hover, // Màu nền khi hover
                            },
                            borderRadius: 2,
                            display: {
                                xs: 'flex',
                                sm: 'none'
                            },
                            mx: 0.5
                        }}
                    >
                        <ExtractIcon sx={{ color: theme.palette.background.default }} />
                    </IconButton>
                </Tooltip>
            </Box>
        </Box>
    );
};

export default Toolbar;
