import React, { useState } from 'react';
import {
    Box,
    AppBar,
    Typography,
    IconButton,
    Container,
    Grid,
    Snackbar,
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpIcon from '@mui/icons-material/Help';
import GitHubIcon from '@mui/icons-material/GitHub';
import CoverFileList from '../components/CoverFileList';
import SecretFileList from '../components/SecretFileList';
import CoverFileToolbar from '../components/CoverFileToolbar';
import { useCoverFileApi } from '../hooks/useCoverFile';
import EmbeddedSecretFileList from '../components/EmbeddedSecretFileList';
import SecretFileToolbar from '../components/SecretFileToolbar';
import EmbeddedSecretFileToolbar from '../components/EmbeddedSecretFileToolbar';

const HomeScreen: React.FC = () => {
    const coverFileApi = useCoverFileApi();
    const [showSnackbar, setShowSnackbar] = useState(true)

    return (
        <>
            <CoverFileToolbar />
            <Container maxWidth={false} sx={{ padding: 0, marginTop: '72px' }}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <CoverFileList />
                    </Grid>
                    <Grid item xs={12}>
                        {coverFileApi.selectedCoverFile()?.isEmbedded ? (
                            <>
                                <EmbeddedSecretFileToolbar />
                                <EmbeddedSecretFileList />
                            </>
                        ) : (
                            <>
                                <SecretFileToolbar />
                                <SecretFileList />
                            </>
                        )}
                    </Grid>
                </Grid>
            </Container>
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                open={showSnackbar}
                onClose={() => setShowSnackbar(false)}
                message='This app is running on a free backend server. It may take up to 50 seconds or more to wake up if idle. If the server is still waking up, please wait and then reload the website after ~50s. Thanks for your patience!'
            />
        </>
    );
};

export default HomeScreen;
