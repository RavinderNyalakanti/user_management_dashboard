import React, { useState, useEffect } from 'react';
import './App.css';
import UserList from './components/UserList';
import CircularProgress from '@mui/material/CircularProgress';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a network request or some async operation
    setTimeout(() => {
      setLoading(false);
    }, 1000); // Adjust the timeout duration as needed
  }, []);

  return (
    <div className="App" style={{ paddingTop: '20px' }}>
      {loading ? (
        <div><CircularProgress disableShrink /> <p>Loading...</p>
        </div>
      ) : (
        <UserList />
      )}
    </div>
  );
}

export default App;
