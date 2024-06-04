
// import React, { useState } from 'react';
// import axios from 'axios';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import "./signup.css";

// const ForgotPassword = () => {
//   const [email, setEmail] = useState('');
//   const [message, setMessage] = useState('');
//   const [error, setError] = useState('');

//   const handleEmailChange = (e) => {
//     setEmail(e.target.value);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(`${process.env.REACT_APP_LOCAL_URL}/forgotpassword`, { email });
//       setMessage(response.data.message);
//       setError('');
//       toast.success(response.data.message); // Success toast
//     } catch (error) {
//       setMessage('');
//       setError(error.response.data.error);
//       toast.error(error.response.data.error); // Error toast
//     }
//   };

//   return (
//     <div className="container-fluid d-flex flex-column justify-content-between align-items-center bg-body-tertiary" style={{ minHeight: "100vh" }}>
//       <ToastContainer /> {/* Toast container */}
//       <div className="paper" style={{borderRadius:"20px"}}>
//         <h1 className="title" style={{ color: "black",textAlign:"center" }}>
//           Forgot Password
//         </h1>
//         <form className="form" onSubmit={handleSubmit}>
//           <input
//             className="inputField"
//             placeholder="Email Address"
//             type="email"
//             value={email}
//             onChange={handleEmailChange}
//             required
//           />
//           <button type="submit" className="submitButton">
//             Reset Password
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ForgotPassword;




import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Paper, TextField, Typography } from '@mui/material';
import './ForgotPassword.css'; // Import your external CSS file

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_LOCAL_URL}/forgotpassword`, { email });
      setMessage(response.data.message);
      setError('');
      toast.success(response.data.message); // Success toast
    } catch (error) {
      setMessage('');
      setError(error.response.data.error);
      toast.error(error.response.data.error); // Error toast
    }
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center " style={{ minHeight: "100vh" }}>
      <ToastContainer /> {/* Toast container */}
      <div className="forgot-password-container">
        <h1 className="title m-2" style={{textAlign:"center"}}>Forgot Password</h1>
        <Paper className="forgot-password-paper p-3" elevation={3} style={{ borderRadius: '20px' }}>
          <form className="forgot-password-form" onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={handleEmailChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className="reset-password-button"
            >
              Reset Password
            </Button>
          </form>
          {error && (
            <Typography variant="body2" className="text-center m-4" style={{ color: "red" }}>
              {error}
            </Typography>
          )}
        </Paper>
      </div>
    </div>
  );
};

export default ForgotPassword;
