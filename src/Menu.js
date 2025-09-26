import React from 'react';
import backgroundImage from './assets/garritano.jpg';

const Menu = ({ navigateTo, onLogout }) => {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Menu Principal</h1>
        <div style={styles.buttonContainer}>
          <button style={styles.button} onClick={() => navigateTo('estoque')}>Gerenciar Estoque</button>
          <button style={styles.button} onClick={() => navigateTo('adicionar-produto')}>Adicionar/Excluir Produtos</button>
          <button style={styles.button} onClick={() => navigateTo('gerenciar-usuarios')}>Gerenciar Usuários</button>
          <button style={styles.button} onClick={() => navigateTo('relatorio-estoque')}>Relatório de Estoque</button>
          <button style={styles.button} onClick={() => navigateTo('clientes')}>Gerenciar Clientes</button>
          <button style={styles.logoutButton} onClick={onLogout}>Sair</button>
        </div>
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
    maxWidth: '500px',
    textAlign: 'center',
    marginTop: '19vh',
  },
  title: {
    fontSize: '2em',
    color: '#333',
    marginBottom: '20px',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
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
    transition: 'background-color 0.3s ease',
  },
  logoutButton: {
    width: '100%',
    padding: '12px',
    fontSize: '16px',
    cursor: 'pointer',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#dc3545',
    color: 'white',
    fontWeight: 'bold',
    marginTop: '20px',
    transition: 'background-color 0.3s ease',
  },
};

export default Menu;