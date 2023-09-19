import { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, Select, MenuItem, FormControl, InputLabel, IconButton, DialogActions, Grid, Typography, Box } from '@mui/material';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import handleFetchRandomName from '../state/Name/nameActions.js';
import { useDispatch, useSelector } from 'react-redux';
import { postFavorite } from '../util/favorites.js';

export default function AddFavorites({isFavorite, handleCloseAddFavorites}) {
  const [ gender, setGender ] = useState('');
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const name = useSelector(state => state.name.name);
  console.log('state:', state);

  async function handleChange(event) {
    const selectedGender = event.target.value;
    setGender(selectedGender);
    await postFavorite(name, selectedGender);
    setGender('');
    handleCloseAddFavorites();
  }

  return (
    <Dialog arial-labelledby='random-modal' aria-describedby='random-description' open={isFavorite} onClose={handleCloseAddFavorites}>
      <Grid container spacing={1}>
        <Grid>
          <DialogTitle>
          Add to Favorites
          </DialogTitle>
        </Grid>
        <Grid>
          <DialogActions>
            <IconButton onClick={handleCloseAddFavorites} >
              <HighlightOffOutlinedIcon />
            </IconButton>
          </DialogActions>
        </Grid>
      </Grid>

      <DialogContent>
        <FormControl fullWidth>
          <InputLabel id='select a gender'>Gender</InputLabel>
          <Select
            labelId='gender-select'
            value='gender'
            label='Gender'
            onChange={event => handleChange(event)}>
            <MenuItem value={'m'}>Male</MenuItem>
            <MenuItem value={'f'}>Female</MenuItem>
            <MenuItem value={'mf'}>Unisex</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
    </Dialog>
  )
}