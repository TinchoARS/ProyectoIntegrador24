import React from 'react';
import authService from '../services/authService';

function Home() {
  const currentUser = authService.getCurrentUser();

  const handleLogout = () => {
    authService.logout();
    window.location.reload();
  };

  return (
    <div>
      {currentUser ? (
        <div>
          <h1>Bienvenido {currentUser.username}</h1>
          <button onClick={handleLogout}>Salir</button>
        </div>
      ) : (
        <div>
          <h1>Home</h1>
          <p>Inicia sesion</p>
        </div>
      )}
    </div>
  );
}

export default Home;
