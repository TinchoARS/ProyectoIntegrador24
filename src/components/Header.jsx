import '../assets/Header.css';
function Header({ onMouseEnter, onMouseLeave }) {
  return (
    <header className="Header">
      <div className="container-responsive">
        <nav className="main-nav">
          <div 
            className="menu-icon" 
            onMouseEnter={onMouseEnter} 
            onMouseLeave={onMouseLeave}
          >
            <img src="/src/assets/menu-icon.svg" alt="Menu Icon" />
          </div>
          <h1>Noticiero local</h1>
          <a href="/" className="nav-link">Home</a>
          <a href="/about" className="nav-link">About</a>
        </nav>
      </div>
    </header>
  );
}

export default Header;
