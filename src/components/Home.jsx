import React, { useState } from 'react';
import Header from './Header';
import SubHeader from './SubHeader';

const Home = () => {
  const [isSubheaderVisible, setSubheaderVisible] = useState(false);

  const handleMouseEnter = () => setSubheaderVisible(true);
  const handleMouseLeave = () => {
  
    setTimeout(() => {
      if (!document.querySelector('.subHeader:hover')) {
        setSubheaderVisible(false);
      }
    }, 100);
  };

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
