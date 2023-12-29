import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './LoginRegister.css';
import { useNavigate } from 'react-router-dom';
  
const LoginForm = ({ onLogin }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [ emailGlobal, setEmailGlobal ] = useState('');
  
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://88.200.63.148:8111/login', {
        email,
        password,
      });

      if (response.data.success) {
        
        onLogin(); // Trigger the login action (redirect to MainPage or set user state)
        navigate('/main');
      } else {
        const errorMessage = response.data.message || 'Invalid email or password';
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
      console.log(emailGlobal)
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
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
            <br />
            <button type="submit">Login</button>
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

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://88.200.63.148:8111/register', {
        name,
        surname,
        email,
        password,
      });

      console.log(response.data);
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  return (
    <div className="form-container">
      <h2>Register</h2>
    <form onSubmit={(e) => handleRegister(e)}>
      <label>Name: <input type="text" value={name} onChange={(e) => setName(e.target.value)} /></label>
      <label>Surname: <input type="text" value={surname} onChange={(e) => setSurname(e.target.value)} /></label>
      <label>Email: <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} /></label>
      <label>Password: <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /></label>
      <button type="submit">Register</button>
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
      <button onClick={()=>setShowlogin(false)}>No account? Register!</button>
      </>}

      {showlogin === false &&
      <>
      <RegisterForm />
      <button onClick={()=>setShowlogin(true)}>Alredy registered? Login!</button>
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