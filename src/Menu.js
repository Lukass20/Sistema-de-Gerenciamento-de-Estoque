import React, { useState, useEffect } from 'react';
import backgroundImage from './assets/garritano.jpg';

const Menu = ({ navigate }) => {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const role = localStorage.getItem('userRole');
    setUserRole(role);
  }, []);

  const isAdmin = userRole === 'administrador';
  const isGerente = userRole === 'gerente';
  const isEstoquista = userRole === 'estoquista';
  const isFuncionario = userRole === 'funcionario';

  const showGerenciarClientes = isAdmin;
  const showGerenciarProdutos = isGerente || isAdmin;
  const showRealizarVenda = isGerente || isAdmin || isFuncionario;
  const showGerenciarEstoque = isEstoquista || isGerente || isAdmin;

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Menu Principal</h1>

        {showGerenciarClientes && (
          <button
            style={styles.button}
            onClick={() => navigate('Clientes')}
          >
            Gerenciar Clientes
          </button>
        )}
        
        {showGerenciarProdutos && (
          <button
            style={styles.button}
            onClick={() => alert('Navegação para Gerenciar Produtos pendente!')}
          >
            Gerenciar Produtos
          </button>
        )}
        
        {showRealizarVenda && (
          <button
            style={styles.button}
            onClick={() => alert('Navegação para Vendas pendente!')}
          >
            Realizar Venda
          </button>
        )}
        
        {showGerenciarEstoque && (
          <button
            style={styles.button}
            onClick={() => navigate('Estoque')}
          >
            Gerenciar Estoque
          </button>
        )}

        <button
          style={{ ...styles.button, ...styles.logoutButton }}
          onClick={() => {
            localStorage.removeItem('userRole');
            navigate('Login');
          }}
        >
          Sair
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
  title: {
    fontSize: 28,
    marginBottom: '30px',
    color: '#333',
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
    marginBottom: '15px',
  },
  logoutButton: {
    backgroundColor: '#dc3545',
    marginTop: '20px',
  }
};

export default Menu;