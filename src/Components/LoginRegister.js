import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './LoginRegister.css';
import { Link, useNavigate } from 'react-router-dom';
import AppUrl from '../Utils/config';
  
const LoginForm = ({ onLogin }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [emailGlobal, setEmailGlobal] = useState('');
  
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${AppUrl.AppUrl}/login`, {
        email,
        password
      });

      if (response.data.user) {
        console.log(response.data)
        onLogin();
        navigate('/main');
      } else {
        const errorMessage = 'Invalid email or password';
        setError(errorMessage);

        document.getElementById('emailInput').style.borderColor = 'red';
        document.getElementById('passwordInput').style.borderColor = 'red';
      }
    } catch (error) {
      setError('Error during login. Please try again.');

      document.getElementById('emailInput').style.borderColor = 'red';
      document.getElementById('passwordInput').style.borderColor = 'red';
    }
  };

    onLogin();

    useEffect(()=>{
      setEmailGlobal(email)
      localStorage.setItem('userEmail', email);
    }, [email])

    return (
      <div>
        <div className="form-container">
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <label>
              Email:
              <input
                id="emailInput"
                type="text"
                value={email}
                className="input-lr"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
            <br />
            <label>
              Password:
              <input
                id="passwordInput"
                type="password"
                value={password}
                className="input-lr"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
            <br />
            <Link to={'/main'}><button className="btnRegLog" type="submit">Login</button></Link>
            {error && <p className="error-message">{error}</p>}
          </form>
        </div>
      </div>
    );
  };

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const checkEmailResponse = await axios.post(`${AppUrl.AppUrl}/register/check-email`, {
        email,
      });
      if (checkEmailResponse.data.exists) {
        setError('User with this email already exists');
        document.getElementById('emailInputReg').style.borderColor = 'red';
      } else {
        const response = await axios.post(`${AppUrl.AppUrl}/register`, {
          name,
          surname,
          email,
          password,
        }); 
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  return (
    <div className="form-container">
      <h2>Register</h2>
    <form onSubmit={(e) => handleRegister(e)}>
      <label>Name: <input type="text" required value={name} className="input-lr" onChange={(e) => setName(e.target.value)} /></label>
      <label>Surname: <input type="text" required value={surname} className="input-lr" onChange={(e) => setSurname(e.target.value)} /></label>
      <label>Email: <input id='emailInputReg' required type="email" value={email} className="input-lr" onChange={(e) => setEmail(e.target.value)} /></label>
      <label>Password: <input type="password" required value={password} className="input-lr" onChange={(e) => setPassword(e.target.value)} /></label>
      <button className="btnRegLog" type="submit">Register</button>
      {error && <p className="error-message">{error}</p>}
    </form>      
    </div>
  );
};

function LoginPage({ onLogin }) {
  const [showlogin, setShowlogin] = useState(true)
  return (
    <div className="login-container">
      {showlogin === true &&
      <>
      <LoginForm onLogin={onLogin} />
      <button className="btnRegLog" onClick={()=>setShowlogin(false)}>No account? Register!</button>
      </>}

      {showlogin === false &&
      <>
      <RegisterForm />
      <button className="btnRegLog" onClick={()=>setShowlogin(true)}>Alredy registered? Login!</button>
      </>}
    </div>
  );
}

function LoginRegister() {
  const handleLogin = () => {
  };

  return (
    <div className="LoginRegister">
      <header className="LoginRegister-header">
        <LoginPage onLogin={handleLogin} />
      </header>
    </div>
  );
}

export default LoginRegister;