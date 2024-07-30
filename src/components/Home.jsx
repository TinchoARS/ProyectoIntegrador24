import React, { useState, useRef, useEffect } from 'react';
import CategoriesList from './CategoriesList';

const Home = () => {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const popupRef = useRef(null);

  const handleMouseEnter = () => setPopupVisible(true);
  const handleMouseLeave = () => setPopupVisible(false);

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setPopupVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      
      <div
        style={{
          backgroundImage: "url('/src/assets/menu-icon.svg')",
          backgroundSize: '24px',
          width: '24px',
          height: '24px',
          border: '2px solid #d3d3d3',
          borderRadius: '12px',
          boxSizing: 'border-box',
          position: 'relative', 
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {isPopupVisible && (
          <div
            ref={popupRef}
            style={{
              position: 'absolute',
              top: '100%', 
              left: 0,
              backgroundColor: '#fff',
              border: '1px solid #ddd',
              borderRadius: '4px',
              padding: '10px',
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
              zIndex: 10,
            }}
          >
            <CategoriesList />
          </div>
        )}
      </div>

    </div>
  );
};

export default Home;
