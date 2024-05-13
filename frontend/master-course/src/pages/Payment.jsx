import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useLocation } from 'react-router-dom';
import { Button, Typography, TextField, Grid, Container, Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab'; // Import Alert component for Snackbar
import axios from 'axios';
import backgroundImage from '../assets/background.jpg';

const PaymentPage = () => {
  const { state } = useLocation();
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [name, setName] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const { selectedCourse, totalPrice } = state;

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/api/payment/process', {
        name: name,
        totalPrice: totalPrice,
      });

      console.log(response.data);

      elements.getElement(CardElement).clear();
      setError(null);
      setSuccessMessage('Payment processed successfully'); // Set success message
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  const handleCloseSnackbar = () => {
    setSuccessMessage(''); // Clear success message when Snackbar is closed
  };

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Container maxWidth="sm">
        <Typography variant="h4" align="center" gutterBottom>
          Payment Information
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Name on Card"
                variant="outlined"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: '16px',
                      color: '#424770',
                      '::placeholder': {
                        color: '#aab7c4',
                      },
                    },
                    invalid: {
                      color: '#9e2146',
                    },
                  },
                }}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={!stripe}
            fullWidth
            style={{ marginTop: '20px' }}
          >
            Pay ${totalPrice}
          </Button>
          {error && <Typography color="error" style={{ marginTop: '10px' }}>{error}</Typography>}
        </form>
      </Container>
      {/* Snackbar for displaying success message */}
      <Snackbar open={!!successMessage} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success" variant="filled">
          {successMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default PaymentPage;
