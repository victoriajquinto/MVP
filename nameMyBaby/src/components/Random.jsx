import { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, Select, MenuItem, FormControl, InputLabel, IconButton, DialogActions, Grid } from '@mui/material';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import handleFetchName from '../state/Name/nameActions.js';
import { useDispatch, useSelector } from 'react-redux';

export default function Random({randomOpen, handleCloseRandom}) {
  const [ gender, setGender ] = useState('');
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  console.log('state:', state);

  async function handleChange(event) {
    const selectedGender = event.target.value;
    setGender(selectedGender);
    await dispatch(handleFetchName(selectedGender));
    setGender('');
    handleCloseRandom();
  }

  return (
    <Dialog arial-labelledby='random-modal' aria-describedby='random-description' open={randomOpen} onClose={handleCloseRandom}>
      <Grid container spacing={1}>
        <Grid>
          <DialogTitle>
          Random Name Generator
          </DialogTitle>
        </Grid>
        <Grid>
          <DialogActions>
          <IconButton onClick={handleCloseRandom} >
            <HighlightOffOutlinedIcon />
          </IconButton>
        </DialogActions>
        </Grid>
      </Grid>

      <DialogContent>
        <FormControl fullWidth>
          <InputLabel id='gender'>Gender</InputLabel>
          <Select
            labelId='gender-select'
            value='gender'
            label='Gender'
            onChange={handleChange}>
            <MenuItem value={'male'}>Male</MenuItem>
            <MenuItem value={'female'}>Female</MenuItem>
            <MenuItem value={'unisex'}>Unisex</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
    </Dialog>
  )
}