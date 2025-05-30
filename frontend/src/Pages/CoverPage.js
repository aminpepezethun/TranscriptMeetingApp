import React from 'react';
import { useNavigate } from 'react-router-dom';

const CoverPage = () => {
  const navigate = useNavigate();
 
  return (
    <div className="container text-center mt-5">
      <h1>Transcript Meeting App</h1>
      <p className="lead">Upload, Record, Transcribe and Share</p>
      <button className='btn btn-primary m-2' onClick={() => navigate('/signup')}>Sign Up</button>
      <button className='btn btn-primary m-2' onClick={() => navigate('/login')}>Log In</button>
    </div>
  );
};

export default CoverPage;