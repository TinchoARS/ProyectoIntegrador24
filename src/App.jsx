// app.jsk
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate} from 'react-router-dom';
import './App.css';
import Home from './components/Home.jsx';
import Login from './components/Login.jsx';
import NewsDetail from './components/NewsDetail.jsx';
//import Navbar from './components/Navbar';


function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
         <Route path="/news/:id" element={<NewsDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
