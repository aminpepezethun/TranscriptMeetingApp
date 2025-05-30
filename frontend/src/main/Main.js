import React from 'react';
import { Link } from 'react-router-dom';

const Main = () => {
  return(
    <div className='container mt-5'>
      <div className='card shadow-sm p-4'>
        <h1 className='mb-3 text-primary'>Welcome to Transcript Meeting App</h1>
        <p className='lead'>
          This is main page. Start by Logging in or Signing Up.
        </p>
        {/* Join button that redirects to login/signup page Auth */}
        <Link to="/authentication" className='btn btn-primary mt-3'>
          Join
        </Link>
      </div>
    </div>
  );
};

export default Main;