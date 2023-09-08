import { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, Select, MenuItem, FormControl, InputLabel, IconButton, DialogActions, Grid, Typography, TextField } from '@mui/material';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import handleFetchName from '../state/Name/nameActions.js';
import { useDispatch, useSelector } from 'react-redux';

export default function AdvancedSearch({advancedOpen, handleCloseAdvanced}) {


  return (
    <Dialog arial-labelledby='random-modal' aria-describedby='random-description' open={advancedOpen} onClose={handleCloseAdvanced}>
      <Grid container spacing={1}>
        <Grid>
          <DialogTitle>
            Advanced Search
          </DialogTitle>
        </Grid>
        <Grid>
          <DialogActions>
          <IconButton onClick={handleCloseAdvanced} >
            <HighlightOffOutlinedIcon />
          </IconButton>
        </DialogActions>
        </Grid>
      </Grid>

      <DialogContent>
        <TextField variant='outlined' label="Name" id="Name" />
        <TextField variant='outlined' label="Gender" id='Gender'/>
        <TextField variant='outlined' label='Starts With...' id='start' />
        <TextField variant='outlined' label='...Ends With' id='end' />
      </DialogContent>
    </Dialog>
  )
}