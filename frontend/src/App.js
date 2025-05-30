import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CoverPage from './Pages/CoverPage';
import AuthPage from './Pages/AuthPage';

function App() {
  return (
    // <div>
    //   <h1>If I see this, React is rendering</h1>
    // </div>
    <Router>
      <Routes>
        <Route path="/" element={<CoverPage />} />
        <Route path="/signup" element={<AuthPage />} />
        <Route path="/login" element={<AuthPage />} />
      </Routes>
    </Router>
  );
}

export default App;
