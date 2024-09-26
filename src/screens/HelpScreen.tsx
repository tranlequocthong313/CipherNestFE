import React from "react";
import {
    Grid,
    Box,
    Typography,
    Link,
    List,
    ListItem,
    ListItemText,
    Divider,
    Container,
} from "@mui/material";
import { useTranslation } from "react-i18next";

const HelpScreen: React.FC = () => {
    const { t } = useTranslation();

    return (
        <Container maxWidth={false} sx={{ padding: 0 }}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography variant="h4" gutterBottom></Typography>

                    <Box sx={{ mb: 4 }}>
                        <Typography variant="h6" gutterBottom>
                            {t("help.section1.title")}
                        </Typography>
                        <List>
                            <ListItem>
                                <ListItemText
                                    primary={
                                        <Link href="#1" variant="body1">
                                            1 &nbsp; {t("help.section1.item1")}
                                        </Link>
                                    }
                                />
                            </ListItem>
                            <List sx={{ ml: 6 }}>
                                <ListItem>
                                    <ListItemText
                                        primary={
                                            <Link href="#1.1" variant="body1">
                                                1.1 &nbsp; {t("help.section1.item2")}
                                            </Link>
                                        }
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText
                                        primary={
                                            <Link href="#1.2" variant="body1">
                                                1.2 &nbsp; {t("help.section1.item3")}
                                            </Link>
                                        }
                                    />
                                </ListItem>
                            </List>
                            <ListItem>
                                <ListItemText
                                    primary={
                                        <Link href="#2" variant="body1">
                                            2 &nbsp; {t("help.section1.item4")}
                                        </Link>
                                    }
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary={
                                        <Link href="#3" variant="body1">
                                            3 &nbsp; {t("help.section1.item5")}
                                        </Link>
                                    }
                                />
                            </ListItem>
                        </List>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default HelpScreen;
