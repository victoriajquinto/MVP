import ListItem from '@mui/material/ListItem';
import Drawer from '@mui/material/Drawer';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import { styled, alpha } from '@mui/material/styles';
import List from '@mui/material/List';
import { Dialog, DialogTitle, DialogContent, Select, MenuItem, FormControl, InputLabel, IconButton, DialogActions, Grid } from '@mui/material';

export default function Sidebar({ isSidebarOpen, handleCloseSidebar }) {

  return (
    // <Drawer open={isSidebarOpen} onClose={handleCloseSidebar} backgroundColor='primary.main'>
    //   <Box
    //     sx={{width: 250}}
    //     onClick={event => handleCloseSidebar()}
    //   >
    //     <List>
    //       <ListItemText>

    //       </ListItemText>

    //     </List>

    //   </Box>

    // </Drawer>

    <Dialog open={isSidebarOpen} onClose={handleCloseSidebar }>
      <Box
        sx={{width: 250}}
        onClick={event => handleCloseSidebar()}
      ></Box>

    </Dialog>
  )
}