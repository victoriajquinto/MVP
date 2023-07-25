import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import SearchAppBar from './SearchAppBar.jsx';
import TopUnisex from './TopUnisex.jsx';
import TopMale from './TopMale.jsx';
import TopFemale from './TopFemale.jsx';

export default function App() {
  return (
    <>
      <SearchAppBar />
      <Box>
        <TopUnisex />
        <TopMale />
        <TopFemale />
      </Box>
    </>
  )
}
