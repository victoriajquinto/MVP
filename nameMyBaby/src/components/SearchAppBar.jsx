import { useState, useEffect } from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import Random from './Random.jsx';
import Sidebar from './Sidebar.jsx';
import { handleSetSpecificName } from '../state/Name/nameActions.js';
import { useDispatch } from 'react-redux';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));


const RNG = styled(Button)(({ theme }) => ({
  color: 'inherit',
  border: 'primary.light'
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(1)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));


export default function SearchAppBar() {
  //for Random Modal
  const [ randomOpen, setRandomOpen ] = useState(false);
  const [ isSidebarOpen, setIsSidebarOpen ] = useState(false);
  const [ search, setSearch ] = useState('');

  const dispatch = useDispatch();

  //for Random Modal
  function handleOpenRandom() {
    alert('modal open');
    setRandomOpen(true);
  }
  function handleCloseRandom() {
    setRandomOpen(false);
  }

  //for Sidebar
  function handleOpenSidebar() {
    alert('baby clicked');
    setIsSidebarOpen(true);
  }
  function handleCloseSidebar() {
    setIsSidebarOpen(false);
  }

  //for Search Bar
  function handleSearchText(event) {
    setSearch(event.target.value);
  }
  async function handleSearchSubmit() {
    //send api call for text saved in search state
    await dispatch(handleSetSpecificName(search))
  }

  return (
    <Box sx={{ flexGrow: 1,
      borderRadius:'5%' }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open Sidebar"
            sx={{ mr: 2 }}
            onClick={event => handleOpenSidebar()}
          >
            <ChildCareIcon />
          </IconButton>
          <Sidebar isSidebarOpen={isSidebarOpen} handleCloseSidebar={handleCloseSidebar}/>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
           Name My Baby
          </Typography>
          <Search>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              onChange={event => handleSearchText()}
            />
            <IconButton onClick={event => handleSearchSubmit()}>
              <SearchIcon />
            </IconButton>
          </Search>
          <Box>
            <RNG variant='outlined' onClick={event => handleOpenRandom(event)}>Random Name Generator</RNG>
            <Random randomOpen={randomOpen} handleCloseRandom={handleCloseRandom}/>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}