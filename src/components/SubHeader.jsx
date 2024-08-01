import React from 'react';
import CategoriesList from './CategoriesList';
import '../assets/SubHeader.css';

function SubHeader({ isVisible, onMouseEnter, onMouseLeave }) {
  //solo se renderiza si es visible is true   
  return (
      isVisible && (
        <div 
          className="subHeader" 
          onMouseEnter={onMouseEnter} 
          onMouseLeave={onMouseLeave}
        >
          <CategoriesList />
        </div>
      )
    );
  }
export default SubHeader;
