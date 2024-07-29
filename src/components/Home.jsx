import React, { useEffect, useState, useContext } from 'react';
import NavBar from '../components/Navbar';
import authService from '../services/authService'; // Asegúrate de tener este servicio importado si es necesario
import '../App.css';
import logo from '../assets/log-news-home.png'; // Asegúrate de importar el archivo CSS

const Home = () => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const user = await authService.getCurrentUser();
        setCurrentUser(user);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();
  }, []);

  const handleLogout = () => {
    authService.logout();
    window.location.reload();
  };

  return (
    <div>
      <NavBar />
      <div className="background-container">
        <div className="background-row row1">
          <img src="image1.jpg" alt="Background 1" className="background-image" />
          <img src="image2.jpg" alt="Background 2" className="background-image" />
          <img src="image3.jpg" alt="Background 3" className="background-image" />
        </div>
        <div className="background-row row2">
          <img src="image4.jpg" alt="Background 4" className="background-image" />
          <img src="image5.jpg" alt="Background 5" className="background-image" />
          <img src="image6.jpg" alt="Background 6" className="background-image" />
        </div>
        <div className="background-row row3">
          <img src="image7.jpg" alt="Background 7" className="background-image" />
          <img src="image8.jpg" alt="Background 8" className="background-image" />
          <img src="image9.jpg" alt="Background 9" className="background-image" />
        </div>
      </div>
      <div className="blur-overlay"></div>
      <div className="container mt-5">
        <img src={logo} alt="Logo" className="logo" />
        {currentUser ? (
          <div>
            <h1>Bienvenido {currentUser.username}</h1>
            <button onClick={handleLogout}>Salir</button>
          </div>
        ) : (
          <div>
            <h1>Home</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;