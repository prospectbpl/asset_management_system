import React, { useState, useEffect } from 'react';
import { Container, Paper, Typography, TextField, Button, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from '../images/salary.jpg';


const SignUpAsset = () => {
  const [dashboardLogo, setDashboardLogo] = useState([]);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    userType: 'user', // default value
  });

  const navigate = useNavigate();
  useEffect(() => {
    const fetchDashboardLogo = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/settings`);
        setDashboardLogo(response.data);
      } catch (error) {
        console.error('Error fetching Dashboard Logo', error);
      }
    };

    fetchDashboardLogo();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_LOCAL_URL}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      // Adjust the success condition based on the actual response structure
      if (response.ok && data.message === 'User created successfully') {
        toast.success('Signup successful!');
        setTimeout(() => {
          navigate('/');
        }, 1000); // 1 second delay
        // Navigate to the desired page after successful signup
      } else if (data.error === 'User already exists') {
        toast.error('User already registered!');
      } else {
        toast.error('Failed to create details! Please ensure all fields are correctly filled.');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    }
  };

  const handleForgotPassword = () => {
    navigate('/forgotpassword');
  };


  return (
    <div className="container-fluid d-flex flex-column justify-content-between align-items-center bg-white" style={{ minHeight: '100vh' }}>
      <ToastContainer /> {/* Toast container */}
      <nav className="login-logo">
        <div style={{ width: "100%", height: "100%" }} className=''>
          <img
            src={dashboardLogo.landingPageLogo
              ? `${process.env.REACT_APP_LOCAL_URL}/uploads/settings/${dashboardLogo.landingPageLogo}`
              : logo}
            className='img-login-logo'
            alt="LOGO"
          />
        </div>
      </nav>

      <Container className="d-flex flex-column justify-content-center align-items-center gap-3">
        <h3 className="text-black ml-3 fw-bolder">HRM SOFTWARE</h3>
        <Paper className="login-paper p-4" style={{ borderRadius: '20px' }} elevation={3}>
          <Typography component="h1" variant="h5" style={{ textAlign: 'center' }}>
            Sign Up
          </Typography>
          <form className="login-form" onSubmit={handleSubmit}>
            <TextField
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              placeholder="Username"
              variant="outlined"
              margin="normal"
              fullWidth
              label="Username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Email"
              variant="outlined"
              margin="normal"
              fullWidth
              label="Email Address"
              autoComplete="email"
            />
            <TextField
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Password"
              variant="outlined"
              margin="normal"
              fullWidth
              label="Password"
              autoComplete="current-password"
            />
            <FormControl fullWidth margin="normal" variant="outlined">
              <InputLabel id="userType-label">User Type</InputLabel>
              <Select
                labelId="userType-label"
                id="userType"
                name="userType"
                value={formData.userType}
                onChange={handleChange}
                label="User Type"
              >
                <MenuItem value="user">User</MenuItem>
                <MenuItem value="manager">Manager</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
              </Select>
            </FormControl>
            <Button type="submit" fullWidth variant="contained" color="primary" className="login-button">
              Sign Up
            </Button>
            <Typography variant="body2" className="text-center m-4">
              <Link onClick={handleForgotPassword} className="signup-link" style={{ cursor: 'pointer' }}>
                Forgot password?
              </Link>
            </Typography>
          </form>
        </Paper>
      </Container>
      <footer className='p-2'>
        Version 1.0 &copy; Developed by Prospect Digital
      </footer>
    </div>
  );
};

export default SignUpAsset;

