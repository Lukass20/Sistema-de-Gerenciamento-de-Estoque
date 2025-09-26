import React from 'react';
import backgroundImage from './assets/garritano.jpg';

const Clientes = ({ goBack }) => {
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
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
      maxWidth: '600px',
      textAlign: 'center',
    },
    title: {
      fontSize: '2em',
      marginBottom: '20px',
      color: '#333',
    },
    button: {
      padding: '12px',
      fontSize: '16px',
      cursor: 'pointer',
      borderRadius: '5px',
      border: 'none',
      backgroundColor: '#6c757d',
      color: 'white',
      fontWeight: 'bold',
      marginTop: '20px',
      width: '100%',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Gerenciar Clientes</h1>
        <p>Aqui você poderá cadastrar e gerenciar as informações dos clientes.</p>
        <button style={styles.button} onClick={goBack}>Voltar ao Menu</button>
      </div>
    </div>
  );
};

export default Clientes;