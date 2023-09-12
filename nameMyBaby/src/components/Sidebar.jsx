import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

export default function Sidebar({ isSidebarOpen, handleCloseSidebar }) {
  return (
    <Drawer
    anchor={'left'}
    open={isSidebarOpen}
    onClose={handleCloseSidebar}
    PaperProps={{
      paper: {
        backgroundColor: 'primary.main'
      }
    }}
    >
      <Box
        sx={{
          width: 250,
          height: '100%',
          backgroundColor: '#606c38'
        }}
        role='presentation'
        onClick={() => handleCloseSidebar()}
      >
        <List>
          <ListItem>
            <ListItemText
              primary="FAVORITES"
              sx={{
                color: 'secondary.light',
                fontSize: 'h4.fontSize'
              }}
            />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText
              primary="Boys"
              sx={{
                color: 'secondary.light'
              }}
            />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText
              primary="Girls"
              sx={{
                color: 'secondary.light'
              }}
            />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText
              primary="Unisex"
              sx={{
                color: 'secondary.light'
              }}
            />
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
}