import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { styled, alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useDispatch, useSelector } from 'react-redux';
import handleFetchInfo from '../state/Info/infoActions.js';

function Languages() {
  const usages = useSelector(state => state.info.info.info[0].usages) || null;
  // console.log('usages in NameInfo', usages);
  const languages = usages.map(use => {return use.usage_full}).join(', ')|| null;
  // console.log('languages', languages);
  return(
    <>
      <Typography variant="body1" id='usage'>
        Usage: {languages}
      </Typography>
    </>
  )
}

function Origin() {
  return(
    <>
      <Typography variant='body1'>
        Origin content
      </Typography>
    </>
  )
}

function Popularity() {
  return(
    <>
      <Typography variant='body1'>
        Popularity content
      </Typography>
    </>
  )
}

function FamousNamesakes() {
  return(
    <>
      <Typography variant='body1'>
        Famous Namesakes content
      </Typography>
    </>
  )
}

function SimilarNames() {
  const related = useSelector(state => state.info.info.related.names);
  console.log('related', related);
  const similar = related.join(', ');
  return(
    <>
      <Typography variant="body1">
        {similar}
      </Typography>
    </>
  )
}

export default function NameInfo() {
  const dispatch = useDispatch();
  const name = useSelector(state => state.name.name);

  useEffect(()=>{
    dispatch(handleFetchInfo(name));
  },[dispatch, name]);

  return(
    <Box sx={{
      backgroundColor: 'secondary.main',
      marginTop: 2,
    }}>
      <Grid
        container
        direction='row'
        justifyContent="center"
        alignItems="center">
        <Grid xs={4}>
          <Typography variant='h2'>{name}</Typography>
        </Grid>
        <Grid xs={7}>
          <Languages />
        </Grid>
        <Grid xs={1}>
          <FavoriteBorderIcon />
        </Grid>
      </Grid>
      <Box>
        <Box>
          <Typography variant='h4'>
            Origin
          </Typography>
          <Origin />

        </Box>
        <Box>
          <Typography variant='h4'>
            U.S. Popularity Over Time
          </Typography>
          <Popularity />
        </Box>
        <Box>
          <Typography variant='h4'>
            Famous Namesakes
          </Typography>
          <FamousNamesakes />
        </Box>
        <Box>
          <Typography variant='h4'>
            Similar Names
          </Typography>
          <SimilarNames />
        </Box>
      </Box>
    </Box>
  )
}