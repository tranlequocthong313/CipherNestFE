import { useState } from 'react';
import './App.css';

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
import Breadcrumbs from './components/Breadcrumbs';
import Loading from './components/Loading';
import { useEmbed } from './hooks/useEmbed';

const App = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const [isSettingsOpen, setSettingsOpen] = useState<boolean>(false);
  const { isLoading = false } = useEmbed();

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
        <Loading open={isLoading} />
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
                sx={{ flexGrow: 1, textDecoration: 'none', color: 'text.secondary' }}
              >
                CipherNest
              </Typography>

              {/* Icon Buttons on the right */}
              <Tooltip title={t('tooltips.settings')} arrow>
                <IconButton
                  aria-label='settings'
                  onClick={handleOpenSettings}
                >
                  <SettingsIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title={t('tooltips.help')} arrow>
                <IconButton
                  aria-label='help'
                  component={Link}
                  to='/help'
                >
                  <HelpIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title={t('tooltips.github')} arrow>
                <IconButton
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
          <Box
            component='main'
            sx={{
              flexGrow: 1,
              p: { xs: 1, sm: 3 },
              px: { xs: 3, sm: 8 },
              mt: 8,
              width: '100vw',
              boxSizing: 'border-box',
            }}
          >
            <Breadcrumbs />

            <Routes>
              <Route path='/' element={<HomeScreen />} />
              <Route path='/help' element={<HelpScreen />} />
            </Routes>
          </Box>
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
