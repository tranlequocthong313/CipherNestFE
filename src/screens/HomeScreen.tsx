import React from 'react';
import { Box, AppBar, Typography, IconButton, Container, Grid } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpIcon from '@mui/icons-material/Help';
import GitHubIcon from '@mui/icons-material/GitHub';
import CoverFileList from '../components/CoverFileList';
import SecretFileList from '../components/SecretFileList';
import Toolbar from '../components/Toolbar';

const HomeScreen: React.FC = () => {
    return (
        <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8, width: '100vw', boxSizing: 'border-box', position: 'relative' }}>
             <Toolbar />
            <Container maxWidth={false} sx={{ padding: 0, marginTop: '66px' }}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <CoverFileList />
                    </Grid>
                    <Grid item xs={12}>
                        <SecretFileList />
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default HomeScreen;
