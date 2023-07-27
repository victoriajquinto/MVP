import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import scrapeWikipediaSummary from '../util/wikiScraper.js';
import { shadows } from '@mui/system'; //dont delete, used by box components for styling
import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton'
import './index.css';
import { useDispatch, useSelector } from 'react-redux';
import handleFetchInfo from '../state/Info/infoActions.js';
import { addFav, removeFav } from '../state/Favorites/favActions.js'
import popularity from '../util/PopularityAPI.js';

// import extractNamesFromHtml from '../util/extractNamesFromHtml.js';


export function Languages() {
  const usages = useSelector(state => state.info.info.info[0].usages) || null;
  // console.log('usages in NameInfo', usages);
  const languages = usages.map(use => {return use.usage_full}).join(', ')|| null;
  // console.log('languages', languages);
  return(
    <>
      <Typography variant="body1" id='usage' color='info.main'>
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
          result = "No information available."
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
    <Box sx={{pl: 1}}>
      <Typography variant='body1'>
      {data}
      </Typography>
      <Typography variant='body1'>
        To learn more, please visit <Link href={url} underline="hover">{url}</Link>.
      </Typography>
      <Typography variant='body2' color= '#524434'>
        Source: Wikipedia
      </Typography>
    </Box>
  ): (
    <Box sx={{pl: 1}}>
      <Typography variant='body1'>
      No information available.
      </Typography>
      <Typography variant='body1'>
        To learn more, please visit <Link href={url} underline="hover">{url}</Link>.
      </Typography>
      <Typography variant='body2' color= '#524434'>
        Source: Wikipedia
      </Typography>
    </Box>
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
            left: 0,
            bottom: 5,
          }}
        >
          <CartesianGrid stroke="#606c38" strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis dataKey="count" />
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
    <Box sx={{pl: 1}}>
      <Typography variant="body1">
        {similar}
      </Typography>
    </Box>
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

  function handleHeart(){
    if(isFavorite){
      setIsFavorite(false);
      dispatch(removeFav(name))
    } else {
      setIsFavorite(true);
      dispatch(addFav(name));

    }
  }

  return(
    <>
      <Box sx={{
        backgroundColor: 'secondary.main',
        marginTop: 2,
        height: '1055px',
        boxShadow: 8,
        padding: "20px",
        borderRadius:'.5%',
        color: 'primary.light'
      }}>
        <Grid
          container
          direction='row'
          justifyContent="center"
          alignItems="center">
          <Grid xs={4} color='info.main'>
            <Typography variant='h2'>{name}</Typography>
          </Grid>
          <Grid xs={7}>
            <Languages />
          </Grid>
          <Grid xs={1}>
            <IconButton onClick={handleHeart}>
              {isFavorite ? (<FavoriteIcon />):(<FavoriteBorderIcon />)}
            </IconButton>
          </Grid>
        </Grid>
        <hr id='mainDivider'></hr>
        <Box>
          <Box sx={{p: 1}}>
            <Typography variant='h5' color= '#524434'>
              Description
            </Typography>
            <Origin />
          </Box>
          <hr></hr>
          {/* <Box>
            <Typography variant='h5'>
              Famous Namesakes
            </Typography>
            <FamousNamesakes />
          </Box> */}
          <Box sx={{p:1}}>
            <Typography variant='h5' color= '#524434'>
              Similar Names
            </Typography>
            <SimilarNames />
          </Box>
          <hr></hr>
          <Box sx={{p:1}}>
            <Box sx={{pb: 1}}>
            <Typography variant='h5' color= '#524434'>
              U.S. Popularity Over Time
            </Typography>

            </Box>
            <Box sx={{
              height:400, maxWidth: 800, padding:'10px', backgroundColor:'primary.light', borderRadius:'1%'}}>
              <Popularity />
            </Box>
          </Box>
        </Box>
      </Box>
    </>

  )
}