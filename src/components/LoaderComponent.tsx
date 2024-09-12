import React from 'react';
import { styled, keyframes } from '@mui/system';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const LoaderContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100px',
  marginTop: '20px',
});

const LoaderCircle = styled('div')({
  border: '8px solid #f3f3f3',
  borderRadius: '50%',
  borderTop: '8px solid #3498db',
  width: '60px',
  height: '60px',
  animation: `${spin} 1s linear infinite`,
});

const LoaderComponent: React.FC = () => {
  return (
    <div>Loading...</div>
  );
};


export default LoaderComponent;
