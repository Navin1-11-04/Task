import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './pages/UserContext';
import Login from './pages/Login';
import Content from './pages/Content';
import './App.css'
const App = () => {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/content" element={<Content />} />
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;
