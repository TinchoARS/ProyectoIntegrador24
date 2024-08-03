// src/components/Home.jsx
import React, { useState, useEffect } from 'react';
import { getProfileData } from '../services/authService';
import Comments from './Comments';

function Home() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      getProfileData(token)
        .then(user => setCurrentUser(user))
        .catch(err => console.error(err));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  return (
    <div>
      {currentUser ? (
        <div>
          <h1>Welcome {currentUser.username}</h1>
          <button onClick={handleLogout}>Logout</button>
          <Comments />
        </div>
      ) : (
        <div>
          <h1>Home Page</h1>
          <p>Please login to see your details.</p>
        </div>
      )}
    </div>
  );
}

export default Home;
