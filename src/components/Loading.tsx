import React from 'react';
import { Backdrop, CircularProgress } from '@mui/material';

interface LoadingProps {
  open: boolean;
}

const Loading: React.FC<LoadingProps> = ({ open }) => {
  return (
    <Backdrop
      sx={{
        color: '#fff',
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      }}
      open={open}
    >
      <CircularProgress color='primary' size={40} thickness={4} />
    </Backdrop>
  );
};

export default Loading;
