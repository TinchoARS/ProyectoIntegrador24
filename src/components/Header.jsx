import '../assets/Header.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import menuIcon from '../assets/menu-icon.svg';
import logo from '../assets/log-news-home.png';

function Header({ onMouseEnter, onMouseLeave }) { 
  return (
    <Navbar expand="lg" className="fixed-top" data-bs-theme="light" style={{ backgroundColor: '#566981' }}>
      <Navbar.Brand href="#Home ">
        <img
          src={logo}
          alt="Logo"
          width="60"
          height="60"
          className="d-inline-block align-center"
        />{' '}
        El Tributo
      </Navbar.Brand>
      <Nav className="me-auto" style= {{marginLeft:'20px'}}>
        <div
          className="menu-icon"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <img src={menuIcon} alt="Menu Icon" width="30"
          height="30"
           />
        </div>
      </Nav>
    </Navbar>
  );

}

export default Header;
