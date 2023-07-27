import { useState, useEffect } from 'react';
import { Box, List, ListItem} from '@mui/material';

import Typography from '@mui/material/Typography';

export default function TopMale() {

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
        Top 10 Male Names of 2022
      </Typography>
      <List>
        {list}
      </List>
    </Box>
  )
}