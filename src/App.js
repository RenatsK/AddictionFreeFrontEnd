import React, { useState } from 'react';
import './App.css';

function LoginForm({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Login with:', { username, password });
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

function RegisterForm() {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    console.log('Register with:', {
      name,
      surname,
      email,
      password: registerPassword,
    });
  };

  return (
    <div>
      <div className="form-container">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Surname:
          <input
            type="text"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={registerPassword}
            onChange={(e) => setRegisterPassword(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Register</button>
      </form>
    </div>
  </div>  
  );
}

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

function App() {
  const handleLogin = () => {
    alert('Login successful!');
  };

  return (
    <div className="App">
      <header className="App-header">
        <LoginPage onLogin={handleLogin} />
      </header>
    </div>
  );
}

export default App;