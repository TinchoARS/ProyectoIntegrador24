import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import img from '../assets/profile.jpg';
import img2 from '../assets/log-news-home.png';
import '../assets/Caroulsel.css';


function CarouselPage() {
  return (
    <Carousel>
      <Carousel.Item interval={700} >
        <div className='carousel-img-blur'>
          <img className='d-block w-100' src={img} alt="First slide" />
        </div>
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={700}>
        <div className='carousel-img-blur'>
          <img className='d-block w-100' src={img2} alt="Second slide" />
        </div>
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={700}>
        <div className='carousel-img-blur'>
          <img className='d-block w-100' src={img} alt="Third slide" />
        </div>
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default CarouselPage;