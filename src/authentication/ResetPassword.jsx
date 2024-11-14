import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Paper, TextField, Typography } from '@mui/material';
// import './Resetpassword.css'; // Import your external CSS file
import myLogo from '../images/Asset.jpg';

const ResetPassword = () => {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
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

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_LOCAL_URL}/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, newPassword }),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage('');
        toast.success('Password reset successfully');
        navigate('/');
      } else {
        setMessage(data.error);
        toast.error(data.error);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Failed to reset password');
      toast.error('Failed to reset password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // <div className="container-fluid d-flex flex-column justify-content-between align-items-center bg-body-tertiary" style={{ minHeight: "100vh" }}>
    //   <ToastContainer /> {/* Toast container */}
    //   <div className="d-flex flex-column justify-content-between align-items-center gap-3">
    //     <h1 className='text-black ml-3'>Reset Password</h1>
    //     <Paper className="reset-password-paper p-4" style={{borderRadius:"10px" }} elevation={3}>
    //       <form className="reset-password-form" onSubmit={handleSubmit}>
    //         <TextField
    //           variant="outlined"
    //           margin="normal"
    //           required
    //           fullWidth
    //           id="newPassword"
    //           label="New Password"
    //           name="newPassword"
    //           type="password"
    //           placeholder="New Password"
    //           value={newPassword}
    //           onChange={(e) => setNewPassword(e.target.value)}
    //         />
    //         <Button
    //           type="submit"
    //           fullWidth
    //           variant="contained"
    //           color="primary"
    //           className="reset-password-button"
    //         >
    //           Reset Password
    //         </Button>
    //       </form>
    //       {message && (
    //         <Typography variant="body2" className='text-center m-4' style={{ color: "red" }}>
    //           {message}
    //         </Typography>
    //       )}
    //     </Paper>
    //   </div>
    //   {/* Footer */}
    //   <footer class="my-2">
    //     <p class="text-center text-body-secondary border-top pt-3 ">Version 1.0 &copy; Developed by Prospect Digital</p>
    //   </footer>
    // </div>
    <div style={{ backgroundColor: "#E8FBFF" }} className='login-container'>
      <div className='main-container-forgotpassward shadow-sm'>
        <ToastContainer /> {/* Toast container */}
        <div className='forgot-main'>
          <div className='content d-flex flex-column align-items-center justify-content-center mainphone '>
            <nav className="loginimg mt-4">
              <div style={{ width: "100%", height: "100%" }} className=''>
                <img
                  src={dashboardLogo.landingPageLogo
                    ? `${process.env.REACT_APP_LOCAL_URL}/uploads/settings/${dashboardLogo.landingPageLogo}`
                    : myLogo}
                  className='img-signin-logo'
                />
              </div>
            </nav>
            <div className='text-center heading mt-2'>
              <h2 style={{ color: "#35A9D0" }} className="title-detail fw-bolder text-uppercase font-bold m-0">Asset Management</h2>
              <p className=''>Track, Control, Optimize – Simplify Your Asset Management in Real-Time.</p>
            </div>
            <div style={{ width: "70%", boxShadow: "2px 2px 10px black" }} className="d-flex flex-column justify-content-around align-items-center gap-3  p-4 rounded-3 text-center ">
              <h4 style={{ color: "#35A9D0" }} className="title-detail fw-bolder text-uppercase font-bold m-0"> forgot</h4>
              <form onSubmit={handleSubmit} autoComplete="off" noValidate="novalidate">
                <div className="row">
                  <div className="form-group">
                    <input id="newPassword" name="newPassword"
                      autoComplete="newPassword"
                      autoFocus
                      type="newPassword"
                      placeholder="New Password" value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)} className="form-control" required />
                  </div>
                  <div className="form-group">
                    <button type="submit" className="btn btn-primary" disabled={isLoading}>
                      {isLoading ? 'Loading...' : 'Forgot Passward'}
                    </button>
                  </div>
                  <hr className='m-1 p-0' />
                  <div className="">
                    <Link style={{ cursor: 'pointer' }} to="/">
                      Sign in ?
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div>
            <div className="d-flex align-items-center justify-content-center">
              <div style={{ width: "50%", height: "100%" }} className='footer-img'>
                <img
                  src={myLogo}
                  className='img-signin-logo'
                />
              </div>
            </div>
            <p className="text-center text-body-secondary">Version 1.0 &copy; Developed by Prospect Digital</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;





































