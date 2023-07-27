import { useState, useEffect } from 'react';
import SearchAppBar from './SearchAppBar.jsx';
import TopUnisex from './TopUnisex.jsx';
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
      light: '#fefae0',
      main: '#606c38',
      dark: '#283618',
      contrastText: "#fefae0"
    },
    secondary: {
      light: "#fefae0",
      main: "#dda15e",
      dark: "#bc6c25",
    }
  },
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
