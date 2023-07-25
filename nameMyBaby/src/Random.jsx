import { useState, useEffect } from 'react';
import axios from 'axios';
import { Dialog, DialogTitle, DialogContent, Select, MenuItem, FormControl, InputLabel, IconButton, DialogActions, Grid } from '@mui/material';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import RNG from '../util/RNG.js';

export default function Random({randomOpen, handleCloseRandom}) {
  const [ gender, setGender ] = useState('');

  function handleChange(event) {
    console.log(event.target.value);
    setGender(event.target.value);
    RNG(gender);
    setGender('');
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