import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { styled, alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useDispatch, useSelector } from 'react-redux';
import handleFetchInfo from '../state/Info/infoActions.js';
import popularity from '../util/PopularityAPI.js';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// import scrapeWikiSummary from '../util/findWikiTop.js';


export function Languages() {
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

export function Origin() {
  // const name = useSelector(state => state.name.name);
  // const [data, setData] = useState('');

  // useEffect(()=>{
  //   async function fetchWikiSummary() {
  //     try {
  //       const result = await scrapeWikiSummary(`${name} (name)`);
  //       setData(result)
  //     } catch (error) {
  //       console.log("error in fetchwikisummary", error);
  //     }
  //   }
  //   fetchWikiSummary();
  // }, [name]);

  return(
    <>
      <Typography variant='body1'>
        Origin content
      </Typography>
      {/* {data} */}
    </>
  )
}

export function FamousNamesakes() {
  return(
    <>
      <Typography variant='body1'>
        Famous Namesakes content
      </Typography>
    </>
  )
}

export function Popularity() {
  const name = useSelector(state => state.name.name);
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await popularity(name);
        setData(result);
      } catch (error) {
        console.log("error in fetchData: ", error);
      }
    }

    fetchData();
  }, [name]);

  return(
    data ? (<>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={100}
          height={100}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis dataKey="count"/>
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="count" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </>):(<Typography variant='body1'> No children in the US named {name} between the ancient past and 2022</Typography>)

  )
}

export function SimilarNames() {
  const related = useSelector(state => state.info.info.related.names);
  // console.log('related', related);
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
    <>
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
          <Box sx={{
             height:400, width: 400}}>
            <Typography variant='h4'>
              U.S. Popularity Over Time
            </Typography>
            <Popularity />
          </Box>
        </Box>
      </Box>
    </>

  )
}