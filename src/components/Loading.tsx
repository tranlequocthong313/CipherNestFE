import React from 'react';
import { Backdrop, CircularProgress } from '@mui/material';

interface LoadingProps {
    open: boolean;
}

const Loading: React.FC<LoadingProps> = ({ open }) => {
    React.useEffect(() => {
        if (open) {
            document.body.style.pointerEvents = 'none';
            document.body.style.userSelect = 'none';
        } else {
            document.body.style.pointerEvents = 'auto';
            document.body.style.userSelect = 'auto';
        }
        return () => {
            document.body.style.pointerEvents = 'auto';
            document.body.style.userSelect = 'auto';
        };
    }, [open]);

    return (
        <Backdrop
            sx={{
                color: '#fff',
                zIndex: (theme) => theme.zIndex.drawer + 9999,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
            }}
            open={open}
        >
            <CircularProgress color='primary' size={40} thickness={4} />
        </Backdrop>
    );
};

export default Loading;
