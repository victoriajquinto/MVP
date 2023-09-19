import { useEffect, useState } from 'react';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { getFavorites } from '../util/favorites.js';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Sidebar({ isSidebarOpen, handleCloseSidebar }) {

  const [ favorites, setFavorites ] = useState([]);

  useEffect(() => {
    // Fetch favorites and update the state when the sidebar is opened
    if (isSidebarOpen) {
      getFavorites()
        .then((data) => {
          setFavorites(data);
        })
        .catch((error) => {
          console.log('Error fetching favorites: ', error.message);
        });
    }
  }, [isSidebarOpen]);

  const favoriteBoyNames =
    favorites
    .filter((el) => el.gender === 'm')
    .map(boy => {return (
      <ListItem
        key={boy.name}
        secondaryAction={
          <IconButton edge="end" aria-label="delete">
            <DeleteIcon />
          </IconButton>
        }
      >
        <Typography variant='body1' color='primary.dark'>{boy.name}</Typography >
      </ListItem>)});

  const favoriteGirlNames =
  favorites
  .filter((el) => el.gender === 'f')
  .map(girl => {return (
    <ListItem
      key={girl.name}
      secondaryAction={
        <IconButton edge="end" aria-label="delete">
          <DeleteIcon />
        </IconButton>
    }>
      <Typography variant='body1' color='primary.dark'>{girl.name}</Typography >
    </ListItem>)});

  const favoriteUnisexNames =
  favorites
  .filter((el) => el.gender === 'mf')
  .map(unisex => {return (
    <ListItem
      key={unisex.name}
      secondaryAction={
        <IconButton edge="end" aria-label="delete">
          <DeleteIcon />
        </IconButton>
      }
    >
      <Typography variant='body1' color='primary.dark'>{unisex.name}</Typography >
    </ListItem>)});


  return (
    <Drawer
    anchor={'left'}
    open={isSidebarOpen}
    onClose={handleCloseSidebar}
    PaperProps={{
      paper: {
        backgroundColor: 'primary.main'
      }
    }}
    >
      <Box
        sx={{
          width: 250,
          height: '100%',
          backgroundColor: '#606c38'
        }}
        role='presentation'
        onClick={() => handleCloseSidebar()}
      >
        <List>
          <ListItem>
            <Typography variant='h5' color='secondary.light'>FAVORITES</Typography >
          </ListItem>
          <Divider />
          <ListItem>
            <Typography variant='h5' color='secondary.light'>boys</Typography >
            </ListItem>
            {favoriteBoyNames}
          <Divider />
          <ListItem>
            <Typography variant='h5' color='secondary.light'>girls</Typography >
          </ListItem>
          {favoriteGirlNames}
          <Divider />
          <ListItem>
          <Typography variant='h5' color='secondary.light'>unisex</Typography >
          </ListItem>
          {favoriteUnisexNames}
        </List>
      </Box>
    </Drawer>
  );
}