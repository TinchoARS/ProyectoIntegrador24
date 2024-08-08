import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import img from '../assets/profile.jpg';
import img2 from '../assets/Trump-home.png';
import img3 from '../assets/Miller-home.jpg';
import img4 from '../assets/bombers-home.jpg';
import img5 from '../assets/Monday-home.png';
import '../assets/Caroulsel.css'; 


function CarouselPage() {
  return (
    <Carousel>
      <Carousel.Item interval={2000} >
        <div className='carousel-img-blur'>
          <img className='d-block w-100' src={img} alt="First slide" />
        </div>
      </Carousel.Item>
      <Carousel.Item interval={2000}>
        <div className='carousel-img-blur'>
          <img className='d-block w-100' src={img2} alt="Second slide" />
        </div>
      </Carousel.Item>
      <Carousel.Item interval={2000}>
        <div className='carousel-img-blur'>
          <img className='d-block w-100' src={img3} alt="Third slide" />
        </div>
      </Carousel.Item>
      <Carousel.Item interval={2000}>
        <div className='carousel-img-blur'>
          <img className='d-block w-100' src={img4} alt="Third slide" />
        </div>
      </Carousel.Item>
      <Carousel.Item interval={2000}>
        <div className='carousel-img-blur'>
          <img className='d-block w-100' src={img5} alt="Third slide" />
        </div>
      </Carousel.Item>
    </Carousel>
  );
}

export default CarouselPage;