import MenuIcon from '@mui/icons-material/Menu';
import { Box, Drawer, IconButton, List, ListItem, ListItemText, Typography, useMediaQuery, useTheme } from '@mui/material';
import React, { useState } from 'react';

function AdminMenu() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const menuItems = ["Dashboard", "Users", "Settings", "Reports", "Notifications", "Support", "Logout"];

  const drawerList = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {menuItems.map((text, index) => (
          <ListItem button key={index}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      {isMobile ? (
        <>
          <IconButton
            edge="start"
            color="#FFFF"
            aria-label="menu"
            onClick={toggleDrawer(true)}
            sx={{ position: 'fixed', top: 10, left: 10, zIndex: 1000 }}
          >
            <MenuIcon />
          </IconButton>
          <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
            {drawerList()}
          </Drawer>
        </>
      ) : (
        <Box
          sx={{
            width: "15%",
            height: "100vh",
            position: "fixed",
            left: 0,
            zIndex: 99,
            backgroundColor: "#2A3F54",
            color: "#FFFF",
            py: 2,
            boxShadow: 3,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Typography variant="h6" align="center" sx={{ mb: 2 }}>
              Admin
            </Typography>
            <List>
              {menuItems.map((text, index) => (
                <ListItem button key={index}>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Box>
      )}
    </>
  );
}

export default AdminMenu;
