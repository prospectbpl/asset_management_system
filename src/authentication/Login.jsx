import React, { useState, useEffect } from 'react';
import { Button, TextField, Paper, Typography, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './login.css'; // Import your external CSS file
import myLogo from '../images/salary.jpg';
import axios from 'axios';
import logo from '../images/Logo/logo.png';  //logo
import { Container } from '@mui/system';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');


  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${process.env.REACT_APP_LOCAL_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.status === 200 && data.message === 'Login successful') {
        // Fetch login details after successful login
        const loginDetailsResponse = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/logindetails/${email}`);
        const loginDetails = loginDetailsResponse.data[0]; // Access the first record

        // Store the required details in localStorage
        localStorage.setItem('token', data.token); // Assuming the token comes from the first response
        localStorage.setItem('username', loginDetails.username);
        localStorage.setItem('fetchemail', loginDetails.email);
        localStorage.setItem('employeeId', loginDetails.employeeId);
        localStorage.setItem('userType', loginDetails.userType);

        // Log the fetched data for debugging
        console.log('Login details:', loginDetails);

        toast.success('Successfully logged in');

        // Redirect based on userType
        if (loginDetails.userType === 'user') {
          window.location.href = '/userdashboard';
        } else if (loginDetails.userType === 'manager' || loginDetails.userType === 'admin') {
          window.location.href = '/dashboard';
        }
      } else {
        toast.error('Invalid email or password');
        setError('Invalid email or password');
      }
    } catch (error) {
      toast.error('Failed to login');
      setError('Invalid email or password');
    }
  };

  const handleForgotPassword = () => {
    navigate('/forgotpassword');
  };

  const [dashboardLogo, setDashboardLogo] = useState([]);

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

  return (
    <div className="container-fluid d-flex flex-column justify-content-around align-items-center bg-white" style={{ minHeight: "100vh" }}>
      <ToastContainer /> {/* Toast container */}
      <nav className="login-logo">
        <div style={{width:"100%",height:"100%"}} className=''>
          <img
            src={dashboardLogo.landingPageLogo
              ? `${process.env.REACT_APP_LOCAL_URL}/uploads/settings/${dashboardLogo.landingPageLogo}`
              : logo}
              className='img-login-logo'
              alt="LOGO"
          />
        </div>
      </nav>
      <Container className="d-flex flex-column justify-content-between align-items-center gap-3">
        <h1 className='text-black ml-3'>HRM Software.</h1>
        <Paper className="login-paper p-4" style={{ borderRadius: "20px" }} elevation={3}>
          <Typography component="h1" variant="h5" style={{ textAlign: "center" }}>
            Sign in
          </Typography>
          <form className="login-form" onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className="login-button"
            >
              Sign In
            </Button>
            <Typography variant="body2" className='text-center m-4'>
              <Link onClick={handleForgotPassword} className="signup-link">
                Forgot password?
              </Link>
            </Typography>
          </form>
        </Paper>
      </Container>
      <footer className="">
        <p className="text-center text-body-secondary border-top pt-3 ">Version 1.0 &copy; Developed by Prospect Digital</p>
      </footer>
    </div>
  );
};

export default Login;
