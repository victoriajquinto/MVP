import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { styled, alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

export default function TopMale() {
  return(
    <Box sx={{
      width: 300,
      height: 300,
      backgroundColor: 'primary.light',
      marginTop: 2,
    }}>
      <Typography>
        Top 10 Male Names
      </Typography>
    </Box>
  )
}