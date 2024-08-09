import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthProvider';
import { login } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { setToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isRegistering, setIsRegistering] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = await login(username, password);
      setToken(token);
      navigate('/profile');
    } catch (error) {
      setError(error.message);
      console.error('Login failed:', error);
    }
  };

  const handleToggle = () => {
    setIsRegistering(!isRegistering);
  };

  return (
  <div style={{ backgroundColor: 'rgb(8, 27, 41)', minHeight: '100vh', padding: '20px' }}>
    <div className="container d-flex justify-content-center align-items-center min-vh-100" style={{ backgroundColor: '#081b29' }}>
      <div className={`row shadow-lg p-4 rounded ${isRegistering ? 'bg-color4' : 'bg-color5'} text-white`} style={{ width: '400px', height: '400px', margin: 'auto' }}>
        <div className="col-md-12">
          <h2 className="text-center">{isRegistering ? 'Registrarse' : 'Login'}</h2>
          <form onSubmit={handleSubmit} autoComplete="on">
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoComplete="username"
                style={{ backgroundColor: 'transparent', color: '#fff', borderBottom: '2px solid #fff' }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                style={{ backgroundColor: 'transparent', color: '#fff', borderBottom: '2px solid #fff' }}
              />
            </div>
            <button type="submit" className="btn btn-outline-light w-100">Login</button>
            {error && <p className="text-danger mt-3">{error}</p>}
          </form>
          <div className="text-center mt-4">
            <p>¿No tenés cuenta? <a href="#!" onClick={handleToggle} className="text-info">Registrate</a></p>
          </div>
        </div>
        <div className="col-md-12 text-center">
          <h2>{isRegistering ? 'Bienvenido' : 'Registrate!'}</h2>
          
        </div>
      </div>
    </div>
  </div>
  );
};

export default Login;
