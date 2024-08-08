import React from 'react';
import CategoriesList from './CategoriesList';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/SubHeader.css';

function SubHeader({ isVisible, onMouseEnter, onMouseLeave }) {
  return (
    isVisible && (
      <div 
        className="subHeader  p-3 position-absolute w-100" 
        onMouseEnter={onMouseEnter} 
        onMouseLeave={onMouseLeave}
        style={{ top: '50px', zIndex: 999, backgroundColor: '#3a415a' }}
      >
        <CategoriesList />
      </div>
    )
  );
}

export default SubHeader;
