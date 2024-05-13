// Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Stack, Avatar, Badge } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import EmailIcon from '@mui/icons-material/Email';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import avatar from '../assets/avatar.jpg'; // Updated import statement to use avatar.jpg

const Header = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        p: 2,
        bgcolor: '#000', // Change background color to black
        color: '#fff', // Change text color to white
      }}
    >
      <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
        Master Learn
      </Typography>
      <Stack direction="row" spacing={4}>
        <Badge badgeContent={4} color="primary">
          <NotificationsIcon />
        </Badge>
        <Badge badgeContent={2} color="primary">
          <EmailIcon />
        </Badge>
        <Link to="/cart">
          <ShoppingCartIcon />
        </Link>
        <Avatar
          alt="User Avatar"
          src={avatar} // Updated src attribute to use avatar.jpg
          sx={{ width: 32, height: 32 }}
        />
      </Stack>
    </Box>
  );
};

export default Header;
