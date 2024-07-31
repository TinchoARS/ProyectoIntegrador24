import React from 'react';
import CategoriesList from './CategoriesList';
import '../assets/SubHeader.css';

function SubHeader({ isVisible, onMouseEnter, onMouseLeave }) {
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
