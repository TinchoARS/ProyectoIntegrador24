import '../assets/Header.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import menuIcon from '../assets/menu-icon.svg';
import logo from '../assets/icons8.png';

function Header({ onMouseEnter, onMouseLeave }) { 
  return (
    <Navbar expand="lg" className="fixed-top" data-bs-theme="dark" style={{ backgroundColor: '#34344e' }}>
      <Navbar.Brand href="#Home " style={{ fontSize: '34px', fontFamily: "Helvetica" }}>
        <img
          src={logo}
          alt="Logo"
          width="50"
          height="50"
          className="d-inline-block align-center"
          style={{ paddingLeft: '5px' }} // Add padding left here
        />{' '}
        El Tributo
      </Navbar.Brand>
      <Nav className="me-auto" style={{ marginLeft: '20px' }}>
        <div
          className="menu-icon"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <img src={menuIcon} alt="Menu Icon" width="30" height="30" />
        </div>
      </Nav>
    </Navbar>
  );

}

export default Header;
