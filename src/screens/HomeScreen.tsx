import React from "react";
import {
    Box,
    AppBar,
    Typography,
    IconButton,
    Container,
    Grid,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import HelpIcon from "@mui/icons-material/Help";
import GitHubIcon from "@mui/icons-material/GitHub";
import CoverFileList from "../components/CoverFileList";
import SecretFileList from "../components/SecretFileList";
import CoverFileToolbar from "../components/CoverFileToolbar";
import { useCoverFileApi } from "../hooks/useCoverFile";
import EmbeddedSecretFileList from "../components/EmbeddedSecretFileList";
import SecretFileToolbar from "../components/SecretFileToolbar";
import EmbeddedSecretFileToolbar from "../components/EmbeddedSecretFileToolbar";

const HomeScreen: React.FC = () => {
    const coverFileApi = useCoverFileApi()

    return (
        <>
            <CoverFileToolbar />
            <Container maxWidth={false} sx={{ padding: 0, marginTop: "72px" }}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <CoverFileList />
                    </Grid>
                    <Grid item xs={12}>

                        {coverFileApi.selectedCoverFile()?.isEmbedded ?
                            <>
                                <EmbeddedSecretFileToolbar />
                                <EmbeddedSecretFileList />
                            </>
                            : // TODO Embedded Secret files
                            <>
                                <SecretFileToolbar />
                                <SecretFileList />
                            </>
                        }
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};

export default HomeScreen;
