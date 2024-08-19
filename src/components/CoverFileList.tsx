import React, { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Typography,
} from '@mui/material';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import { styled } from '@mui/system';

interface ICoverFile {
    name: string;
    path: string;
    size: number; // size in bytes
    type: string;
}

const FileIcon = styled(AudiotrackIcon)(({ theme }) => ({
    marginRight: theme.spacing(1),
}));

const formatFileSize = (size: number) => {
    return `${(size / (1024 * 1024)).toFixed(2)} MB`;
};

const CoverFileList: React.FC = () => {
    const [files, setFiles] = useState<ICoverFile[]>([]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = event.target.files;
        if (selectedFiles) {
            const fileList = Array.from(selectedFiles).map((file) => ({
                name: file.name,
                path: file.webkitRelativePath || file.name, // webkitRelativePath to get the relative path if using folder input
                size: file.size,
                type: file.type,
            }));
            setFiles(fileList);
        }
    };

    return (
        <>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>File Type</TableCell>
                            <TableCell>File Name</TableCell>
                            <TableCell>File Path</TableCell>
                            <TableCell>File Size</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {files.map((file, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    <IconButton>
                                        <FileIcon />
                                    </IconButton>
                                </TableCell>
                                <TableCell>
                                    <Typography>{file.name}</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography>{file.path}</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography>{formatFileSize(file.size)}</Typography>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default CoverFileList;
