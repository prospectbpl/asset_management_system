import React from 'react';
import { Link } from 'react-router-dom';
// import './PageNotFound.css'; // Optional: If you want to add custom styles

const PageNotFound = () => {
    return (

        <div style={{height:"100vh",width:"100vw"}} className="d-flex align-items-center justify-content-center">
            <div className='text-center'>
            <h1 className='text-black fw-bolder'>404 - Page Not Found</h1>
            <p>Sorry, the page you are looking for does not exist.</p>
            <Link to="/">Go back to Home</Link>  
            </div>
        </div>
    );
};

export default PageNotFound;
