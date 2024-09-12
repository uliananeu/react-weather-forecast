import React from 'react';
import { styled } from '@mui/system';

const LoaderContainer = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
});

const Loader = styled('div')({
    border: '5px solid #f3f3f3',
    borderTop: '5px solid #4f9a94',
    borderRadius: '50%',
    width: '50px',
    height: '50px',
    animation: 'spin 1s linear infinite',
    '@keyframes spin': {
        '0%': { transform: 'rotate(0deg)' },
        '100%': { transform: 'rotate(360deg)' },
    },
});

const LoaderComponent: React.FC = () => (
    <LoaderContainer>
        <Loader />
    </LoaderContainer>
);

export default LoaderComponent;
