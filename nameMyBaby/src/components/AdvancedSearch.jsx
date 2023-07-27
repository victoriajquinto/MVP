import { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, Select, MenuItem, FormControl, InputLabel, IconButton, DialogActions, Grid } from '@mui/material';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import handleFetchName from '../state/Name/nameActions.js';
import { useDispatch, useSelector } from 'react-redux';

export default function AdvancedSearch({advancedOpen, handleCloseAdvanced}) {


  return (
    <Dialog arial-labelledby='random-modal' aria-describedby='random-description' open={advancedOpen} onClose={handleCloseAdvanced}>
      <Grid container spacing={1}>
        <Grid>
          <DialogTitle>
          You thought you had a say in your baby's name? Think again.
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
    </Dialog>
  )
}