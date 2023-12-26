import React, { useState } from 'react';
import axios from 'axios';
import './LoginRegister.css';

function LoginForm({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  const handleLogin = (e) => {
    e.preventDefault();
    //console.log('Login with:', { username, password });
    onLogin();
  };

  return (
    <div>
      <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Password:
          <input
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
}

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://88.200.63.148:28111/register', {
        name,
        surname,
        email,
        password,
      });

      console.log(response.data); // Should log the response from the server
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