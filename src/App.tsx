import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import {
    Box,
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    CssBaseline,
    Tooltip,
    ThemeProvider,
    Divider,
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpIcon from '@mui/icons-material/Help';
import GitHubIcon from '@mui/icons-material/GitHub';
import SettingsModal from './components/SettingsModal';
import useTheme from './hooks/useTheme';
import { useTranslation } from 'react-i18next';
import HomeScreen from './screens/HomeScreen';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HelpScreen from './screens/HelpScreen';

const App = () => {
    const { theme } = useTheme();
    const { t } = useTranslation();
    const [isSettingsOpen, setSettingsOpen] = useState<boolean>(false);

    const handleOpenSettings = () => {
        setSettingsOpen(true);
    };

    const handleCloseSettings = () => {
        setSettingsOpen(false);
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <Box
                    sx={{
                        display: 'flex',
                        minHeight: '100vh',
                        backgroundColor: theme.palette.background.default,
                    }}
                >
                    {/* AppBar */}
                    <AppBar position='fixed'>
                        <Toolbar>
                            <Typography
                                variant='h6'
                                component={Link}
                                to='/'
                                sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}
                            >
                                CipherNest
                            </Typography>

                            {/* Icon Buttons on the right */}
                            <Tooltip title={t('tooltips.settings')} arrow>
                                <IconButton
                                    color='inherit'
                                    aria-label='settings'
                                    onClick={handleOpenSettings}
                                >
                                    <SettingsIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title={t('tooltips.help')} arrow>
                                <IconButton
                                    color='inherit'
                                    aria-label='help'
                                    component={Link}
                                    to='/help'
                                >
                                    <HelpIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title={t('tooltips.github')} arrow>
                                <IconButton
                                    color='inherit'
                                    aria-label='github'
                                    component='a'
                                    href='https://github.com/tranlequocthong313/CipherNest'
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    sx={{ textDecoration: 'none' }}
                                >
                                    <GitHubIcon />
                                </IconButton>
                            </Tooltip>
                        </Toolbar>
                    </AppBar>

                    <Routes>
                        <Route path='/' element={<HomeScreen />} />
                        <Route path='/help' element={<HelpScreen />} />
                    </Routes>
                </Box>
            </Router>

            <SettingsModal open={isSettingsOpen} onClose={handleCloseSettings} />

            <Divider sx={{ my: 4 }} />
            <Typography variant='body2' align='center' sx={{ pb: 3 }}>
                © tranlequocthong313 2024-2025
            </Typography>
        </ThemeProvider>
    );
};

export default App;
