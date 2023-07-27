import { useState, useEffect } from 'react';
import SearchAppBar from './SearchAppBar.jsx';
import TopMale from './TopMale.jsx';
import TopFemale from './TopFemale.jsx';
import NameInfo from './NameInfo.jsx';
import Grid from '@mui/material/Unstable_Grid2';
import { useSelector, useDispatch } from 'react-redux';


import { createTheme, ThemeProvider } from '@mui/material/styles';

const darkTheme = createTheme(({
  palette: {
    mode: 'dark',
  }
}));

const theme = createTheme({
  palette: {
    primary: {
      light: '#E5CAA2',
      main: '#606c38',
      dark: '#283618',
      contrastText: "#F1E5C6"
    },
    secondary: {
      light: "#F1E5C6",
      main: "#B07C42",
      dark: "#bc6c25",
    },
    info: {
      main: '#2F2011'
    }
  },
  spacing: 10,
})

export default function App() {

  return (
    <ThemeProvider theme={theme}>
      <SearchAppBar />
      <Grid container spacing={1}>
        <Grid xs={3}>
          <TopMale />
          <TopFemale />
        </Grid>
        <Grid xs={9}>
          <NameInfo />
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}
