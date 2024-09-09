import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import myLogo from '../images/salary.jpg';

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
    navigate('/forgot-password'); // Adjust the route to your forgot password page
  };

  return (<div className="container-fluid d-flex flex-column justify-content-between align-items-center bg-body-tertiary" style={{ minHeight: '100vh' }}>
    <ToastContainer /> {/* Toast container */}
    <nav className="bg-transparent">
      <div style={{ height: '50px' }}>
        <img
          src={dashboardLogo.landingPageLogo
            ? `${process.env.REACT_APP_LOCAL_URL}/uploads/settings/${dashboardLogo.landingPageLogo}`
            : myLogo}
          style={{ height: "100%", objectFit: "cover" }}
          alt="LOGO"
        />
      </div>
    </nav>
    <h1 className="text-black ml-3">HRM SOFTWARE</h1>
    <div className="d-flex flex-column justify-content-between align-items-center gap-3 w-25">
      <div className='bg-white p-3 rounded shadow-sm w-100' >
        <div>
          <h2 className='text-center text-black fw-bolder'>Signup</h2>
          <form onSubmit={handleSubmit} autoComplete="off" noValidate="novalidate">
            <div className="form-group">
              <label className='text-black' htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                placeholder='Username'
                className='form-control'
              />
            </div>
            <div className="form-group">
              <label className='text-black' htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder='Email'
                className='form-control'
              />
            </div>
            <div className="form-group">
              <label className='text-black' htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder='Password'
                className='form-control'
              />
            </div>
            <div className="form-group">
              <label className='text-black' htmlFor="userType">userType</label>
              <select
                id="userType"
                name="userType"
                value={formData.userType}
                onChange={handleChange}
                required
                className='form-control'
              >
                <option value="user">User</option>
                <option value="manager">Manager</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div className='text-center'>
              <button type="submit" className="btn btn-primary">Signup</button>
            </div>
          </form>
          <Link onClick={handleForgotPassword} className="forgot-password text-center">Forgot Password?</Link>
        </div>
      </div>
      <footer className='p-2'>
        Version 1.0 &copy; Developed by Prospect Digital
      </footer>
    </div>
  </div>);
};

export default SignUpAsset;

