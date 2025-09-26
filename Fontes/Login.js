import React, { useState } from 'react';
import backgroundImage from './assets/garritano.jpg';
import logoImage from './assets/logo.png';

const Login = ({ onLoginSuccess, navigateTo }) => {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ usuario, senha }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Login realizado com sucesso.');
        onLoginSuccess(data.user);
      } else {
        alert(data.message || 'Erro ao realizar login.');
      }
    } catch (err) {
      alert('Não foi possível conectar ao servidor. Verifique se o servidor está rodando.');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <img src={logoImage} alt="Garritano Logo" style={styles.logo} />
        <h1 style={styles.title}>Sistema Garritano</h1>
        <input
          type="text"
          placeholder="Usuário"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          style={styles.input}
        />
        <button style={styles.button} onClick={handleLogin}>Entrar</button>
        <button style={styles.registerButton} onClick={() => navigateTo('cadastro')}>Cadastrar</button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
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
    marginTop: '23vh',
  },
  logo: {
    width: '300px',
    marginBottom: '50px',
  },
  title: {
    fontSize: '2em',
    marginBottom: '20px',
    color: '#333',
  },
  input: {
    width: 'calc(100% - 20px)',
    padding: '10px',
    margin: '10px 0',
    borderRadius: '5px',
    border: '1px solid #ccc',
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
    transition: 'background-color 0.3s ease',
  },
  registerButton: {
    width: '100%',
    backgroundColor: '#6c757d',
    marginTop: '10px',
    padding: '12px', 
    fontSize: '16px',
    cursor: 'pointer',
    borderRadius: '5px',
    border: 'none',
    color: 'white',
    fontWeight: 'bold',
  }
};

export default Login;