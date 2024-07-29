import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthProvider';
import { login } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
  }
  body {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: #081b29;
  }
`;

const Wrapper = styled.div`
  position: relative;
  width: 750px;
  height: 450px;
  background: transparent;
  border: 2px solid #0ef;
  box-shadow: 0 0 25px #0ef;
  overflow: hidden;
  display: flex;

  .form-box {
    position: absolute;
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    transition: 0.7s ease;
    transition-delay: calc(0.1s * var(--i));
    &.login {
      left: 0;
      padding: 0 60px 0 40px;
    }
    &.register {
      right: 0;
      padding: 0 40px 0 60px;
      pointer-events: none;
    }
    &.active {
      transform: translateX(-100%);
      opacity: 0;
      transition-delay: calc(0.1s * var(--i));
    }
    h2 {
      font-size: 32px;
      color: #fff;
      text-align: center;
    }
    .input-box {
      position: relative;
      width: 100%;
      height: 50px;
      margin: 25px 0;
      input {
        width: 100%;
        height: 100%;
        background: transparent;
        border: none;
        outline: none;
        border-bottom: 2px solid #fff;
        padding-right: 23px;
        font-size: 16px;
        color: #fff;
        font-weight: 500;
        transition: 0.5s;
        &:focus,
        &:valid {
          border-bottom-color: #0ef;
        }
      }
      label {
        position: absolute;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
        font-size: 16px;
        color: #fff;
        pointer-events: none;
        transition: 0.5s;
        &.active {
          top: -10px;
          color: #0ef;
        }
      }
      input:focus + label,
input-box input:not(:placeholder-shown) + label {
  top: -10px;
  color: #0ef;
}
    }
    .btn {
      position: relative;
      width: 100%;
      height: 45px;
      background: transparent;
      border: 2px solid #0ef;
      outline: none;
      border-radius: 40px;
      cursor: pointer;
      font-size: 16px;
      color: #fff;
      font-weight: 600;
      overflow: hidden;
      &:before {
        content: '';
        position: absolute;
        top: -100%;
        left: 0;
        width: 100%;
        height: 300%;
        background: linear-gradient(#290810, #0ef, #081b29, #0ef);
        z-index: -1;
        transition: 1.5s ease;
        transition-delay: 1.6s;
      }
      &:hover:before {
        top: 0;
      }
      &:hover {
        color: #081b29;
        background-color: #0ef;
        transform: scale(1.05);
        transition: 0.3s ease;
      }
    }
    .logreg-link {
      font-size: 14.5px;
      color: #fff;
      text-align: center;
      margin: 20px 0 16px;
      p {
        a {
          color: #0ef;
          text-decoration: none;
          font-weight: 600;
          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
  }
  .info-text {
    position: absolute;
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    transition: 0.7s ease;
    transition-delay: calc(0.1s * var(--j));
    &.login {
      right: 0;
      text-align: right;
      padding: 0 40px 60px 150px;
      &.active {
        transform: translateX(-120%);
        opacity: 0;
        filter: blur(10px);
        transition-delay: 0.1s;
      }
    }
    &.register {
      left: 0;
      text-align: left;
      padding: 0 150px 60px 40px;
      pointer-events: none;
      &.active {
        transform: translateX(120%);
        opacity: 0;
        filter: blur(10px);
        transition-delay: 0.1s;
      }
    }
    h2 {
      font-size: 36px;
      color: #fff;
      line-height: 1.3;
      text-transform: uppercase;
    }
    p {
      font-size: 16px;
      color: #fff;
    }
  }
  .bg-animate {
    position: absolute;
    top: -4px;
    right: 0;
    width: 850px;
    height: 600px;
    background: linear-gradient(45deg, #081b29, #0ef);
    border-bottom: 3px solid #0ef;
    transform: rotate(10deg) skewY(40deg);
    transform-origin: bottom right;
    transition: 1.5s ease;
    transition-delay: 1.6s;
  }
  .bg-animate2 {
    position: absolute;
    top: 100%;
    left: 250px;
    width: 850px;
    height: 700px;
    background: #081b29;
    border-bottom: 3px solid #0ef;
    transform: rotate(0) skewY(0);
    transform-origin: bottom left;
    transition: 1.5s ease;
    transition-delay: 0.5s;
  }
  .active .bg-animate {
    transform: rotate(0) skewY(0);
    transition-delay: 0.5s;
  }
  .active .bg-animate2 {
    transform: rotate(-11deg) skewY(-41deg);
    transition-delay: 1.2s;
  }
`;

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
    <>
      <GlobalStyle />
      <Wrapper className={isRegistering ? 'active' : ''}>
        <span className="bg-animate"></span>
        <span className="bg-animate2"></span>
        <div className={`form-box login ${isRegistering ? 'active' : ''}`}>
          <h2 className="animation" style={{ '--i': 0 }}>Login</h2>
          <form onSubmit={handleSubmit} className="animation" style={{ '--i': 1 }} autoComplete="on">
          <div className="input-box animation" style={{ '--i': 2 }}>
  <input
    type="text"
    name="username"
    value={username}
    onChange={(e) => setUsername(e.target.value)}
    required
    autoComplete="username"
    placeholder=" " />
  <label className={username ? 'active' : ''}>Username</label>
</div>
<div className="input-box animation" style={{ '--i': 3 }}>
  <input
    type="password"
    name="password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    required
    autoComplete="current-password"
    placeholder=" " />
  <label className={password ? 'active' : ''}>Password</label>
</div>

            <button type="submit" className="btn animation" style={{ '--i': 4 }}>Login</button>
            {error && <p className="error animation" style={{ '--i': 5 }}>{error}</p>}
          </form>
          <div className="logreg-link animation" style={{ '--i': 6 }}>
            <p>¿No tenés cuenta? <a href="#!" onClick={handleToggle}>Registrate</a></p>
          </div>
        </div>
        <div className={`form-box register ${!isRegistering ? 'active' : ''}`}>
          <h2 className="animation" style={{ '--i': 0 }}>Registrarse</h2>
          <form className="animation" style={{ '--i': 1 }}>
            <div className="input-box animation" style={{ '--i': 2 }}>
              <input type="text" required />
              <label>Username</label>
            </div>
            <div className="input-box animation" style={{ '--i': 2 }}>
              <input type="text" required />
              <label>Email</label>
            </div>
            <div className="input-box animation" style={{ '--i': 3 }}>
              <input type="password" required />
              <label>Password</label>
            </div>
            <button type="submit" className="btn animation" style={{ '--i': 4 }}>Registrarse</button>
          </form>
          <div className="logreg-link animation" style={{ '--i': 5 }}>
            <p>¿Ya tenés una cuenta? <a href="#!" onClick={handleToggle}>Login</a></p>
          </div>
        </div>
        <div className={`info-text login ${isRegistering ? 'active' : ''}`}>
          <h2 className="animation" style={{ '--j': 0 }}>Bienvenido</h2>
          <p className="animation" style={{ '--j': 1 }}>Inicia sesión para un acceso completo a nuestra web</p>
        </div>
        <div className={`info-text register ${!isRegistering ? 'active' : ''}`}>
          <h2 className="animation" style={{ '--j': 0 }}>Registrate!</h2>
          <p className="animation" style={{ '--j': 1 }}>Unite a nuestra web</p>
        </div>
      </Wrapper>
    </>
  );
};

export default Login;
