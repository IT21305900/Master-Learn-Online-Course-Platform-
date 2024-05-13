import React, { useState } from 'react';
import { Box, Typography, Button, Grid, Paper, IconButton, Radio } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import Axios for making HTTP requests

const Cart = () => {
  const navigate = useNavigate();
  const [course1Quantity, setCourse1Quantity] = useState(1);
  const [course2Quantity, setCourse2Quantity] = useState(1);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const course1Price = 29.99;
  const course2Price = 19.99;

  const handleCourse1Increment = () => {
    setCourse1Quantity(course1Quantity + 1);
  };

  const handleCourse1Decrement = () => {
    if (course1Quantity > 1) {
      setCourse1Quantity(course1Quantity - 1);
    }
  };

  const handleCourse2Increment = () => {
    setCourse2Quantity(course2Quantity + 1);
  };

  const handleCourse2Decrement = () => {
    if (course2Quantity > 1) {
      setCourse2Quantity(course2Quantity - 1);
    }
  };

  const handleSelectCourse = (course) => {
    setSelectedCourse(course);
  };

  const handleSelectAllItems = () => {
    setCourse1Quantity(2);
    setCourse2Quantity(2);
  };

  const handleCheckout = async () => {
    try {
      const response = await axios.post('http://localhost:3002/api/cart/add', {
        course: selectedCourse,
        quantity: selectedCourse === 'course1' ? course1Quantity : course2Quantity
      });
      console.log(response.data); // Log the response from the backend
      navigate('/payment', { state: { selectedCourse, totalPrice } });
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const totalPrice = (selectedCourse === 'course1' ? course1Quantity * course1Price : course2Quantity * course2Price);

  return (
    <Box sx={{ padding: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" component="h2">
          Shopping Cart (2)
        </Typography>
        <Box>
          <Button
            variant="outlined"
            color="primary"
            size="small"
            startIcon={<CheckCircleIcon />}
            sx={{ mr: 1 }}
            onClick={handleSelectAllItems}
          >
            Select all items
          </Button>
          <Button variant="outlined" color="error" size="small" startIcon={<DeleteIcon />}>
            Delete selected items
          </Button>
        </Box>
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Radio
                checked={selectedCourse === 'course1'}
                onChange={() => handleSelectCourse('course1')}
                color="primary"
              />
              <img src="/course1.jpg" alt="Course 1" style={{ width: 100 }} />
              <Box sx={{ ml: 2, flex: 1 }}>
                <Typography variant="body1">Course 1</Typography>
                <Typography variant="body2" color="text.secondary">Description of Course 1</Typography>
                <Typography variant="body2" color="text.secondary">$29.99</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconButton onClick={handleCourse1Decrement}>
                  <RemoveIcon />
                </IconButton>
                <Typography variant="body1">{course1Quantity}</Typography>
                <IconButton onClick={handleCourse1Increment}>
                  <AddIcon />
                </IconButton>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Radio
                checked={selectedCourse === 'course2'}
                onChange={() => handleSelectCourse('course2')}
                color="primary"
              />
              <img src="/course2.jpg" alt="Course 2" style={{ width: 100 }} />
              <Box sx={{ ml: 2, flex: 1 }}>
                <Typography variant="body1">Course 2</Typography>
                <Typography variant="body2" color="text.secondary">Description of Course 2</Typography>
                <Typography variant="body2" color="text.secondary">$19.99</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconButton onClick={handleCourse2Decrement}>
                  <RemoveIcon />
                </IconButton>
                <Typography variant="body1">{course2Quantity}</Typography>
                <IconButton onClick={handleCourse2Increment}>
                  <AddIcon />
                </IconButton>
              </Box>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h6" gutterBottom>Summary</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="body1">Total</Typography>
              <Typography variant="body1">${totalPrice.toFixed(2)}</Typography>
            </Box>
            <Button
              variant="contained"
              color="primary"
              size="large"
              startIcon={<ShoppingCartIcon />}
              sx={{ width: '100%' }}
              onClick={handleCheckout}
            >
              Checkout (2)
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Cart;
