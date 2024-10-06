import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Landing from './Landing';
import Login from './Login'; 

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <Routes>
      {isAuthenticated ? (
        <Route path="*" element={<Navigate to="/landing" replace />} />
      ) : (
        <Route path="*" element={<Navigate to="/login" replace />} />
      )}
      <Route path="/landing" element={<Landing />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
