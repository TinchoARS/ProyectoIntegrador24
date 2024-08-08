import React, { useState } from 'react';
import Header from './Header';
import SubHeader from './SubHeader';
import CarouselPage from './CaroulselPage';
import { Container, Row, Col, Button } from 'react-bootstrap';
import '../assets/Caroulsel.css';

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
    <div className="home-container">
      <Header 
        onMouseEnter={handleMouseEnter} 
        onMouseLeave={handleMouseLeave} 
      />
      <SubHeader 
        isVisible={isSubheaderVisible} 
        onMouseEnter={handleMouseEnter} 
        onMouseLeave={handleMouseLeave} 
      />
      <div className="carousel-wrapper">
        <CarouselPage />
      </div>
      <Container className="home-content text-center">
        <Row className="my-5">
          <Col md={6}>
          <br />
          <br />
          <br />
            <h2>Últimas Noticias</h2>
            <p>Lee las noticias más recientes y mantente informado.</p>
          </Col>
          <Col md={6}>
          <br />
          <br />
          <br />
        
            <h2>Categorías Populares</h2>
            <p>Descubre las categorías más populares y relevantes.</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
