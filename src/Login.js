import React, { useState } from 'react';
import backgroundImage from './assets/garritano.jpg';
import logoImage from './assets/logo.png';

const Login = ({ navigate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, senha: password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        localStorage.setItem('userRole', data.role);
        setError('');
        navigate('Menu');
      } else {
        setError(data.message || 'Erro no login.');
      }
    } catch (err) {
      setError('Não foi possível conectar ao servidor. Verifique se o servidor está rodando.');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <img src={logoImage} alt="Logo" style={styles.logo} />
        <h1 style={styles.title}>Supermercado Garritano</h1>
        <p style={styles.subtitle}>Sistema de Gestão</p>

        <div style={styles.inputGroup}>
          <label htmlFor="email" style={styles.label}>E-mail:</label>
          <input 
            id="email" 
            type="email" 
            style={styles.input} 
            placeholder="Digite seu e-mail" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div style={styles.inputGroup}>
          <label htmlFor="password" style={styles.label}>Senha:</label>
          <input 
            id="password" 
            type="password" 
            style={styles.input} 
            placeholder="Digite sua senha" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && <p style={styles.errorText}>{error}</p>}

        <button
          style={styles.button}
          onClick={handleLogin}
        >
          Entrar
        </button>

        <button
          style={{...styles.button, ...styles.registerButton}}
          onClick={() => navigate('Cadastro')}
        >
          Cadastrar
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    fontFamily: 'Arial, sans-serif',
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  card: {
    padding: '40px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    backgroundColor: 'white',
    width: '100%',
    maxWidth: '400px',
    textAlign: 'center',
  },
  logo: {
    width: '100px',
    marginBottom: '20px',
  },
  title: {
    fontSize: 28,
    marginBottom: '5px',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: '30px',
  },
  inputGroup: {
    marginBottom: '20px',
    textAlign: 'left',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    color: '#555',
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    boxSizing: 'border-box',
    fontSize: '16px',
  },
  button: {
    width: '100%',
    padding: '12px',
    fontSize: '16px',
    cursor: 'pointer',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#007bff',
    color: 'white',
    fontWeight: 'bold',
    marginTop: '10px',
  },
  errorText: {
    color: '#dc3545',
    marginBottom: '10px',
  },
  registerButton: {
    backgroundColor: '#6c757d', // Cinza para o botão de cadastro
    marginTop: '10px',
  },
};

export default Login;