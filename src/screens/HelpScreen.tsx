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
                    <Typography variant="h4" gutterBottom>
                        {t("help.title")}
                    </Typography>

                    <Divider sx={{ my: 4 }} />

                    {/* --- Section 1: Steganography --- */}
                    <Box id="1" sx={{ mb: 4 }}>
                        <Typography paragraph>
                            {`The Least Significant Bit (LSB) algorithm is one of the simplest and
                            most effective steganography methods. It hides information inside the
                            lowest bit positions of audio samples, making the change inaudible to
                            human ears.`}
                        </Typography>
                    </Box>

                    {/* --- Subsection 1.1: Embedding --- */}
                    <Box id="1.1" sx={{ mb: 4, ml: 3 }}>
                        <Typography variant="h6" gutterBottom>
                            {t("help.section1.item2")}
                        </Typography>
                        <List>
                            <ListItem>
                                <ListItemText primary="1. Compress the secret file to reduce size and improve capacity." />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="2. Encrypt the compressed data with AES or another secure method." />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="3. Split the encrypted data into individual bits." />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="4. Replace the least significant bits of the audio samples with those data bits." />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="5. Save the modified audio as the cover file with hidden data." />
                            </ListItem>
                        </List>
                    </Box>

                    {/* --- Subsection 1.2: Extraction --- */}
                    <Box id="1.2" sx={{ mb: 4, ml: 3 }}>
                        <Typography variant="h6" gutterBottom>
                            {t("help.section1.item3")}
                        </Typography>
                        <List>
                            <ListItem>
                                <ListItemText primary="1. Read the least significant bits from the audio samples." />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="2. Reconstruct the encrypted data stream." />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="3. Decrypt the data using the provided password/key." />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="4. Decompress the decrypted result to obtain the original secret file(s)." />
                            </ListItem>
                        </List>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default HelpScreen;
