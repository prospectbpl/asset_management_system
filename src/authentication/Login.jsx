// import React, { useState } from 'react';
// import { Button, TextField, Paper, Typography, Link } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import axios from 'axios';
// import { jwtDecode } from 'jwt-decode';
// import './login.css'; // Import your external CSS file
// // import BASE_URL from "./../components/apiconfig";

// const Login = () => {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const apiUrl = process.env.REACT_APP_LOCAL_URL;

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       const response = await fetch(`${apiUrl}/login`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email, password }),
//       });
//       const data = await response.json();
//       if (response.ok) {
//         toast.success('Successfully logged in'); // Notify success
//         navigate('/dashboard');
//       } else {
//         toast.error('Failed to login'); // Notify error
//         setPassword(''); // Clear password field
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       toast.error('Failed to login'); // Notify error
//     }
//   };


//   const handleForgotPassword = () => {
//     // Add logic for handling forgot password
//     navigate('/forgotpassword');
//     console.log("Forgot Password Clicked");
//   };

//   return (
//     <div className="container-fluid d-flex flex-column justify-content-between align-items-center bg-body-tertiary" style={{ minHeight: "100vh" }}>
//       <ToastContainer /> {/* Toast container */}
//       <nav className="bg-transparent m-2">
//         <div className="" style={{ height: "50px" }}>
//           <img
//             src="https://prospectlegal.co.in/wp-content/uploads/2022/12/PROSPECT-LEGAL-NEW-LOGO.png"
//             alt="Logo"
//             className="" style={{ height: "100%", objectFit: "cover" }}
//           />
//         </div>
//       </nav>
//       <div className="d-flex flex-column justify-content-between align-items-center gap-3">
//         <h1 className='text-black ml-3'>Asset Management System .</h1>
//         <Paper className="login-paper" elevation={3}>
//           <Typography component="h1" variant="h5">
//             Sign in
//           </Typography>
//           <form className="login-form" onSubmit={handleSubmit}>
//             <TextField
//               variant="outlined"
//               margin="normal"
//               required
//               fullWidth
//               id="email"
//               label="Email Address"
//               name="email"
//               autoComplete="email"
//               autoFocus
//               type="email"
//               placeholder="Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//             <TextField
//               variant="outlined"
//               margin="normal"
//               required
//               fullWidth
//               name="password"
//               label="Password"
//               type="password"
//               id="password"
//               autoComplete="current-password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               color="primary"
//               className="login-button"
//             >
//               Sign In
//             </Button>
//             <Typography variant="body2" className='text-center m-4'>
//               <Link onClick={handleForgotPassword} className="signup-link">
//                 Forgot password?
//               </Link>
//             </Typography>
//           </form>
//         </Paper>
//       </div>
//       {/* Footer */}
//       <footer class="my-2">
//         <p class="text-center text-body-secondary border-top pt-3 ">Version 1.0 &copy; Developed by Prospect Digital</p>
//       </footer>
//     </div>

//   );
// };

// export default Login;



// import React, { useState } from 'react';
// import { Button, TextField, Paper, Typography, Link } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import './login.css'; // Import your external CSS file

// const Login = () => {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');

//   const apiUrl = process.env.REACT_APP_LOCAL_URL;

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       const response = await fetch(`${apiUrl}/login`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email, password }),
//       });
//       const data = await response.json();
//       if (response.status === 200 && data.message === 'Login successful') {
//         // Login successful, store the token in locatstorage
//         localStorage.setItem('token', data.token);
//         // Redirect to dashboard or any protected route
//         toast.success('Successfully logged in');
//         window.location.href = '/dashboard';
//       } else {
//         toast.error('Invalid  password');
//         setError('Invalid email or password');
//       }
//     } catch (error) {
//       toast.error('Failed to login');
//       setError('Invalid email or password');
//     }
//   };

//   const handleForgotPassword = () => {
//     // Add logic for handling forgot password
//     navigate('/forgotpassword');
//   };

//   return (
//     <div className="container-fluid d-flex flex-column justify-content-between align-items-center bg-body-tertiary" style={{ minHeight: "100vh" }}>
//       <ToastContainer /> {/* Toast container */}
//       <nav className="bg-transparent m-2">
//         <div className="" style={{ height: "50px" }}>
//           <img
//             src="https://prospectlegal.co.in/wp-content/uploads/2022/12/PROSPECT-LEGAL-NEW-LOGO.png"
//             alt="Logo"
//             className="" style={{ height: "100%", objectFit: "cover" }}
//           />
//         </div>
//       </nav>
//       <div className="d-flex flex-column justify-content-between align-items-center gap-3">
//         <h1 className='text-black ml-3'>Asset Management System .</h1>
//         <Paper className="login-paper" elevation={3}>
//           <Typography component="h1" variant="h5">
//             Sign in
//           </Typography>
//           <form className="login-form" onSubmit={handleSubmit}>
//             <TextField
//               variant="outlined"
//               margin="normal"
//               required
//               fullWidth
//               id="email"
//               label="Email Address"
//               name="email"
//               autoComplete="email"
//               autoFocus
//               type="email"
//               placeholder="Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//             <TextField
//               variant="outlined"
//               margin="normal"
//               required
//               fullWidth
//               name="password"
//               label="Password"
//               type="password"
//               id="password"
//               autoComplete="current-password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               color="primary"
//               className="login-button"
//             >
//               Sign In
//             </Button>
//             <Typography variant="body2" className='text-center m-4'>
//               <Link onClick={handleForgotPassword} className="signup-link">
//                 Forgot password?
//               </Link>
//             </Typography>
//           </form>
//         </Paper>
//       </div>
//       {/* Footer */}
//       <footer class="my-2">
//         <p class="text-center text-body-secondary border-top pt-3 ">Version 1.0 &copy; Developed by Prospect Digital</p>
//       </footer>
//     </div>
//   );
// };

// export default Login;


// // Import necessary dependencies
// import React, { useState } from 'react';
// import { Button, TextField, Paper, Typography, Link } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import './login.css'; // Import your external CSS file

// const Login = ({ handleLogin }) => { // Accept handleLogin prop
//   const navigate = useNavigate();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');

//   const apiUrl = process.env.REACT_APP_LOCAL_URL;

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       const response = await fetch(`${apiUrl}/login`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email, password }),
//       });
//       const data = await response.json();
//       if (response.status === 200 && data.message === 'Login successful') {
//         // Login successful, store the token in localStorage
//         localStorage.setItem('token', data.token);
//         // Call handleLogin function and pass token and username
//         handleLogin({ token: data.token, username: data.username });
//         // Redirect to dashboard or any protected route
//         toast.success('Successfully logged in');
//         navigate('/dashboard');
//       } else {
//         toast.error('Invalid email or password');
//         setError('Invalid email or password');
//       }
//     } catch (error) {
//       toast.error('Failed to login');
//       setError('Invalid email or password');
//     }
//   };

//   const handleForgotPassword = () => {
//     // Add logic for handling forgot password
//     navigate('/forgotpassword');
//   };

//   return (
//     <div className="container-fluid d-flex flex-column justify-content-between align-items-center bg-body-tertiary" style={{ minHeight: "100vh" }}>
//       <ToastContainer /> {/* Toast container */}
//       <nav className="bg-transparent m-2">
//         <div className="" style={{ height: "50px" }}>
//           <img
//             src="https://prospectlegal.co.in/wp-content/uploads/2022/12/PROSPECT-LEGAL-NEW-LOGO.png"
//             alt="Logo"
//             className="" style={{ height: "100%", objectFit: "cover" }}
//           />
//         </div>
//       </nav>
//       <div className="d-flex flex-column justify-content-between align-items-center gap-3">
//         <h1 className='text-black ml-3'>Asset Management System .</h1>
//         <Paper className="login-paper" elevation={3}>
//           <Typography component="h1" variant="h5">
//             Sign in
//           </Typography>
//           <form className="login-form" onSubmit={handleSubmit}>
//             <TextField
//               variant="outlined"
//               margin="normal"
//               required
//               fullWidth
//               id="email"
//               label="Email Address"
//               name="email"
//               autoComplete="email"
//               autoFocus
//               type="email"
//               placeholder="Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//             <TextField
//               variant="outlined"
//               margin="normal"
//               required
//               fullWidth
//               name="password"
//               label="Password"
//               type="password"
//               id="password"
//               autoComplete="current-password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               color="primary"
//               className="login-button"
//             >
//               Sign In
//             </Button>
//             <Typography variant="body2" className='text-center m-4'>
//               <Link onClick={handleForgotPassword} className="signup-link">
//                 Forgot password?
//               </Link>
//             </Typography>
//           </form>
//         </Paper>
//       </div>
//       {/* Footer */}
//       <footer class="my-2">
//         <p class="text-center text-body-secondary border-top pt-3 ">Version 1.0 &copy; Developed by Prospect Digital</p>
//       </footer>
//     </div>
//   );
// };

// export default Login;



// import React, { useState } from 'react';
// import { Button, TextField, Paper, Typography, Link } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import './login.css'; // Import your external CSS file

// const Login = () => {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');

//   const apiUrl = process.env.REACT_APP_LOCAL_URL;

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       const response = await fetch(`${apiUrl}/login`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email, password }),
//       });
//       const data = await response.json();
//       if (response.status === 200 && data.message === 'Login successful') {
//         // Login successful, store the token in locatstorage
//         localStorage.setItem('token', data.token);
//         // Redirect to dashboard or any protected route
//         toast.success('Successfully logged in');
//         window.location.href = '/dashboard';
//       } else {
//         toast.error('Invalid  password');
//         setError('Invalid email or password');
//       }
//     } catch (error) {
//       toast.error('Failed to login');
//       setError('Invalid email or password');
//     }
//   };

//   const handleForgotPassword = () => {
//     // Add logic for handling forgot password
//     navigate('/forgotpassword');
//   };

//   return (
//     <div className="container-fluid d-flex flex-column justify-content-between align-items-center bg-body-tertiary" style={{ minHeight: "100vh" }}>
//       <ToastContainer /> {/* Toast container */}
//       <nav className="bg-transparent m-2">
//         <div className="" style={{ height: "50px" }}>
//           <img
//             src="https://prospectlegal.co.in/wp-content/uploads/2022/12/PROSPECT-LEGAL-NEW-LOGO.png"
//             alt="Logo"
//             className="" style={{ height: "100%", objectFit: "cover" }}
//           />
//         </div>
//       </nav>
//       <div className="d-flex flex-column justify-content-between align-items-center gap-3">
//         <h1 className='text-black ml-3'>Asset Management System .</h1>
//         <Paper className="login-paper" elevation={3}>
//           <Typography component="h1" variant="h5">
//             Sign in
//           </Typography>
//           <form className="login-form" onSubmit={handleSubmit}>
//             <TextField
//               variant="outlined"
//               margin="normal"
//               required
//               fullWidth
//               id="email"
//               label="Email Address"
//               name="email"
//               autoComplete="email"
//               autoFocus
//               type="email"
//               placeholder="Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//             <TextField
//               variant="outlined"
//               margin="normal"
//               required
//               fullWidth
//               name="password"
//               label="Password"
//               type="password"
//               id="password"
//               autoComplete="current-password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               color="primary"
//               className="login-button"
//             >
//               Sign In
//             </Button>
//             <Typography variant="body2" className='text-center m-4'>
//               <Link onClick={handleForgotPassword} className="signup-link">
//                 Forgot password?
//               </Link>
//             </Typography>
//           </form>
//         </Paper>
//       </div>
//       {/* Footer */}
//       <footer class="my-2">
//         <p class="text-center text-body-secondary border-top pt-3 ">Version 1.0 &copy; Developed by Prospect Digital</p>
//       </footer>
//     </div>
//   );
// };

// export default Login;



// import React, { useState } from 'react';
// import { Button, TextField, Paper, Typography, Link } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import './login.css'; // Import your external CSS file

// const Login = () => {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
  

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       const response = await fetch(`${process.env.REACT_APP_LOCAL_URL}/login`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email, password }),
//       });
//       const data = await response.json();
//       if (response.status === 200 && data.message === 'Login successful') {
//         // Login successful, store the token in localStorage
//         localStorage.setItem('token', data.token);
//         // Redirect to dashboard or any protected route
//         toast.success('Successfully logged in');
//         window.location.href = '/dashboard';
//       } else {
//         toast.error('Invalid password');
//         setError('Invalid email or password');
//       }
//     } catch (error) {
//       toast.error('Failed to login');
//       setError('Invalid email or password');
//     }
//   };

//   const handleForgotPassword = () => {
//     // Add logic for handling forgot password
//     navigate('/forgotpassword');
//   };

//   return (
//     <div className="container-fluid d-flex flex-column justify-content-between align-items-center bg-body-tertiary" style={{ minHeight: "100vh" }}>
//       <ToastContainer /> {/* Toast container */}
//       <nav className="bg-transparent m-2">
//         <div className="" style={{ height: "50px" }}>
//           <img
//             src="https://prospectlegal.co.in/wp-content/uploads/2022/12/PROSPECT-LEGAL-NEW-LOGO.png"
//             alt="Logo"
//             className="" style={{ height: "100%", objectFit: "cover" }}
//           />
//         </div>
//       </nav>
//       <div className="d-flex flex-column justify-content-between align-items-center gap-3">
//         <h1 className='text-black ml-3'>Asset Management System .</h1>
//         <Paper className="login-paper p-4" style={{borderRadius:"20px" }} elevation={3}>
//           <Typography component="h1" variant="h5" style={{textAlign:"center"}}>
//             Sign in
//           </Typography>
//           <form className="login-form" onSubmit={handleSubmit}>
//             <TextField
//               variant="outlined"
//               margin="normal"
//               required
//               fullWidth
//               id="email"
//               label="Email Address"
//               name="email"
//               autoComplete="email"
//               autoFocus
//               type="email"
//               placeholder="Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//             <TextField
//               variant="outlined"
//               margin="normal"
//               required
//               fullWidth
//               name="password"
//               label="Password"
//               type="password"
//               id="password"
//               autoComplete="current-password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               color="primary"
//               className="login-button"
//             >
//               Sign In
//             </Button>
//             <Typography variant="body2" className='text-center m-4'>
//               <Link onClick={handleForgotPassword} className="signup-link">
//                 Forgot password?
//               </Link>
//             </Typography>
//           </form>
//         </Paper>
//       </div>
//       {/* Footer */}
//       <footer className="my-2">
//         <p className="text-center text-body-secondary border-top pt-3 ">Version 1.0 &copy; Developed by Prospect Digital</p>
//       </footer>
//     </div>
//   );
// };

// export default Login;


import React, { useState,useEffect } from 'react';
import { Button, TextField, Paper, Typography, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './login.css'; // Import your external CSS file
import axios from 'axios';

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
        // Login successful, store the token and username in localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', data.username); // Store username
        // Redirect to dashboard or any protected route
        toast.success('Successfully logged in');
        window.location.href = '/dashboard';
      } else {
        toast.error('Invalid password');
        setError('Invalid email or password');
      }
    } catch (error) {
      toast.error('Failed to login');
      setError('Invalid email or password');
    }
  };

  const handleForgotPassword = () => {
    // Add logic for handling forgot password
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
    <div className="container-fluid d-flex flex-column justify-content-between align-items-center bg-body-tertiary" style={{ minHeight: "100vh" }}>
      <ToastContainer /> {/* Toast container */}
      <nav className="bg-transparent m-2">
        <div className="" style={{ height: "50px" }}>
          <img src={`${process.env.REACT_APP_LOCAL_URL}/uploads/settings/${dashboardLogo.landingPageLogo}`} style={{  height: "100%", objectFit: "cover"  }} alt="LOGO" />
        </div>
      </nav>
      <div className="d-flex flex-column justify-content-between align-items-center gap-3">
        <h1 className='text-black ml-3'>Asset Management System .</h1>
        <Paper className="login-paper p-4" style={{borderRadius:"20px" }} elevation={3}>
          <Typography component="h1" variant="h5" style={{textAlign:"center"}}>
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
      </div>
      {/* Footer */}
      <footer className="my-2">
        <p className="text-center text-body-secondary border-top pt-3 ">Version 1.0 &copy; Developed by Prospect Digital</p>
      </footer>
    </div>
  );
};

export default Login;
