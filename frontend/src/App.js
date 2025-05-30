import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from "./main/Main";
import Auth from "./auth/Auth";
import TranscriptMeeting from './meeting/TranscriptMeeting';

function App() {
  return (
    // <div>
    //   <h1>If I see this, React is rendering</h1>
    // </div>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/authentication" element={<Auth />} />
        <Route path="/transcript-meeting" element={<TranscriptMeeting />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
