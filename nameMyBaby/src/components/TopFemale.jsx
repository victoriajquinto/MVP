import { useState, useEffect } from 'react';
import { Box, List, ListItem} from '@mui/material';
import Typography from '@mui/material/Typography';
// import sendTopTen from '../util/toptenAPI.js';

// export function ListFormat(name, index, key) {
//   let number = index + 1;
//   return (

//   )
// }

export default function TopFemale() {
  // const [data, setData] = useState('');
  // async function executeSendAPI() {
  //   let result = await sendTopTen("F");
  //   setData(result);
  // }

  // useEffect(() => {
  //   executeSendAPI();
  // }, []);

  // let list = data.map((object, index) => {return (ListFormat(object.name, index))});

  let data = ["Olivia", 'Emma', "Charlotte", "Amelia", 'Sophia', 'Isabella', 'Ava', 'Mia', 'Evelyn', 'Luna'];
  let list = data.map((name, index) => {return (<ListItem><Typography variant='body1'>{index+1}. {name}</Typography ></ListItem>)});

  return(
    <Box sx={{
      width: 300,
      height: 450,
      backgroundColor: 'primary.light',
      marginTop: 2,
    }}>
      <Typography variant='h6'>
        Top 10 Female Names of 2022
      </Typography>
      <List>
        {list}
      </List>
    </Box>
  )
}