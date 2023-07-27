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
import scrapeWikipediaSummary from '../util/wikiScraper.js';
import { shadows } from '@mui/system';
import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton'
import './index.css';

// import extractNamesFromHtml from '../util/extractNamesFromHtml.js';


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
  const name = useSelector(state => state.name.name);
  const [data, setData] = useState('');
  const [url, setUrl ] = useState('');

  useEffect(()=>{
    async function fetchWikiSummary() {
      try {

        let result = await scrapeWikipediaSummary(`${name}_(name)`);
        let successfulEndpoint = `${name}_(name)`;

        if(!result) {
          result = await scrapeWikipediaSummary(`${name}`);
          successfulEndpoint = `${name}`;
        }

        if(!result) {
          result = await scrapeWikipediaSummary(`${name}_(given_name)`);
          successfulEndpoint = `${name}_(given_name)`;
        }

        if(result.includes('may refer to:')){
          result = "No origin information available."
        }

        let earl = `https://en.wikipedia.org/wiki/${successfulEndpoint}`;
        setUrl(earl);
        setData(result);
      } catch (error) {
        console.log("error in fetchwikisummary", error);
      }
    }
    fetchWikiSummary();
  }, [name]);

  return data ? (
    <>
      <Typography variant='body1'>
      {data}
      </Typography>
      <Typography variant='body1'>
        For more information or to see related wikipedia articles, please visit <Link href={url} underline="hover">{url}
        </Link>.
      </Typography>

    </>
  ): (
    <>
      <Typography variant='body1'>
      No origin data available.
      </Typography>
      <Typography variant='body1'>
        For more information, please visit <Link href={url} underline="hover">{url}
        </Link>.
      </Typography>
    </>
  )
}

export function FamousNamesakes() {
  const name = useSelector(state => state.name.name);
  const [data, setData] = useState('No famous people information available');

  useEffect(()=>{
    async function fetchFamousNames() {
      try {
        const result = await extractNamesFromHtml(name);
        setData(result)
      } catch (error) {
        console.log("error in fetchFamousNames", error);
      }
    }
    fetchFamousNames();
  }, [name]);
  return(
    <>
      <Typography variant='body1'>
        {data}
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
          <Line type="monotone" dataKey="count" stroke="#283618" activeDot={{ r: 8 }} />
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
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(()=>{
    dispatch(handleFetchInfo(name));
  },[dispatch, name]);

  useEffect(()=>{
    setIsFavorite(false);
  },[name]);

  function handleIcon(){
    setIsFavorite(true);
  }

  return(
    <>
      <Box sx={{
        backgroundColor: 'secondary.main',
        marginTop: 2,
        height: '1000px',
        boxShadow: 10,
        padding: "20px"
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
            <IconButton onClick={handleIcon}>
              {isFavorite ? (<FavoriteIcon />):(<FavoriteBorderIcon />)}
            </IconButton>
          </Grid>
        </Grid>
        <hr></hr>
        <Box>
          <Box sx={{padding: '10px'}}>
            <Typography variant='h4'>
              Origin
            </Typography>
            <Origin />
          </Box>
          {/* <Box>
            <Typography variant='h4'>
              Famous Namesakes
            </Typography>
            <FamousNamesakes />
          </Box> */}
          <Box sx={{padding: '10px'}}>
            <Typography variant='h4'>
              Similar Names
            </Typography>
            <SimilarNames />
          </Box>
          <Box sx={{
             height:400, width: 800, padding:'10px'}}>
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