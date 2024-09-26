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

                    <Box id="1" sx={{ mb: 4 }}>
                        <Typography variant="h5" gutterBottom>
                            {t("help.section2.title")}
                        </Typography>
                        <Typography variant="body1" paragraph>
                            {t("help.section2.paragraph1")}
                        </Typography>
                        <List>
                            <ListItem>
                                <ListItemText primary={t("help.section2.listItem1")} />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary={t("help.section2.listItem2")} />
                            </ListItem>
                        </List>
                        <img
                            src="Documentation_files/AddSecretData.png"
                            alt="Create Category"
                            style={{ width: "100%" }}
                        />
                    </Box>

                    <Box id="1.1" sx={{ mb: 4 }}>
                        <Typography variant="h6" gutterBottom>
                            {t("help.section3.title")}
                        </Typography>
                        <Typography variant="body1" paragraph>
                            {t("help.section3.paragraph1")}
                        </Typography>
                        <List>
                            <ListItem>
                                <ListItemText primary={t("help.section3.listItem1")} />
                            </ListItem>
                        </List>
                        <img
                            src="Documentation_files/EncodeSecretData1.png"
                            alt="Category Detail"
                            style={{ width: "100%" }}
                        />
                    </Box>

                    <Box id="1.2" sx={{ mb: 4 }}>
                        <Typography variant="h6" gutterBottom>
                            {t("help.section4.title")}
                        </Typography>
                        <Typography variant="body1" paragraph>
                            {t("help.section4.paragraph1")}
                        </Typography>
                        <List>
                            <ListItem>
                                <ListItemText primary={t("help.section4.listItem1")} />
                            </ListItem>
                        </List>
                        <img
                            src="Documentation_files/ExtractSecretData.png"
                            alt="Create Album"
                            style={{ width: "100%" }}
                        />
                    </Box>

                    <Box id="1.3" sx={{ mb: 4 }}>
                        <Typography variant="h6" gutterBottom>
                            {t("help.section5.title")}
                        </Typography>
                        <Typography variant="body1" paragraph>
                            {t("help.section5.paragraph1")}
                        </Typography>
                        <Typography variant="body1" paragraph>
                            <strong>{t("help.section5.notice")}</strong>
                        </Typography>
                    </Box>

                    <Box id="1.4" sx={{ mb: 4 }}>
                        <Typography variant="h6" gutterBottom>
                            {t("help.section6.title")}
                        </Typography>
                        <Typography variant="body1" paragraph>
                            {t("help.section6.paragraph1")}
                        </Typography>
                        <List>
                            <ListItem>
                                <ListItemText
                                    primary={<strong>{t("help.section6.listItem1")}</strong>}
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary={<strong>{t("help.section6.listItem2")}</strong>}
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary={<strong>{t("help.section6.listItem3")}</strong>}
                                />
                            </ListItem>
                        </List>
                        <img
                            src="Documentation_files/Settings.png"
                            alt="Add New Version"
                            style={{ width: "100%" }}
                        />
                    </Box>

                    <Box id="1.5" sx={{ mb: 4 }}>
                        <Typography variant="h6" gutterBottom>
                            {t("help.section7.title")}
                        </Typography>
                        <List>
                            <ListItem>
                                <ListItemText primary={t("help.section7.listItem1")} />
                            </ListItem>
                        </List>
                        <img
                            src="Documentation_files/AudioConverter2.png"
                            alt="Add New Version"
                            style={{ width: "100%" }}
                        />
                        <List>
                            <ListItem>
                                <ListItemText primary={t("help.section7.listItem2")} />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary={t("help.section7.listItem3")} />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary={t("help.section7.listItem4")} />
                            </ListItem>
                        </List>
                        <img
                            src="Documentation_files/AudioConverter1.png"
                            alt="Add New Version"
                            style={{ width: "100%" }}
                        />
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default HelpScreen;
