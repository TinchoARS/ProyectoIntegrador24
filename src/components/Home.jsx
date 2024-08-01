import React, { useState } from 'react';
import Header from './Header';
import SubHeader from './SubHeader';

const Home = () => {
  const [isSubheaderVisible, setSubheaderVisible] = useState(false);
  // determina si el submenu debe ser visible o no
  //define dos funciiones que actualizan el estado de la visibilidad del submenu
  const handleMouseEnter = () => setSubheaderVisible(true);
  const handleMouseLeave = () => {
  //para que no oculte el submenu apenas me alejo si no despues de un retraso
  //verifica que el usuario siga con el mouse sobre el si no lo esta
  //lo oculta
    setTimeout(() => {
      if (!document.querySelector('.subHeader:hover')) {
        setSubheaderVisible(false);
      }
    }, 100);
  };
//se utiliza los eventos en ambos para detectar el movimiento
//del mouse dentro del menu principal y dentro del submenu
  return (
    <div>
      <Header 
        onMouseEnter={handleMouseEnter} 
        onMouseLeave={handleMouseLeave} 
      />
      <SubHeader 
        isVisible={isSubheaderVisible} 
        onMouseEnter={handleMouseEnter} 
        onMouseLeave={handleMouseLeave} 
      />
      <h1>Welcome to the Home Page</h1>
    </div>
  );
};

export default Home;
