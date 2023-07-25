import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import SearchAppBar from './SearchAppBar.jsx';
import TopUnisex from './TopUnisex.jsx';
import TopMale from './TopMale.jsx';
import TopFemale from './TopFemale.jsx';
import NameInfo from './NameInfo.jsx';
import teal from '@mui/material/colors/teal';
import Grid from '@mui/material/Unstable_Grid2';

import { createTheme, ThemeProvider } from '@mui/material/styles';

const darkTheme = createTheme(({
  palette: {
    mode: 'dark',
  }
}));

const tealTheme = createTheme({
  palette: {
    primary: {
      light: '#b2dfdb',
      main: '#00796b',
      dark: '#004d40',
    }
  },
})

export default function App() {
  return (
    <ThemeProvider theme={tealTheme}>
      <SearchAppBar />
      <Grid container spacing={1}>
        <Grid xs={4}>
          <TopUnisex />
          <TopMale />
          <TopFemale />
        </Grid>
        <Grid xs={8}>
          <NameInfo />
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}
