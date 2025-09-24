import React, { useState } from 'react';
import Login from './Login';
import Menu from './Menu';
import Cadastro from './Cadastro';
import Estoque from './Estoque'; 
import AdicionarProduto from './AdicionarProduto'; 
import GerenciarUsuarios from './GerenciarUsuarios'; 
import RelatorioEstoque from './RelatorioEstoque'; 
import Clientes from './Clientes'; 

function App() {
  const [currentScreen, setCurrentScreen] = useState('login');
  const [user, setUser] = useState(null);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setCurrentScreen('menu');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentScreen('login');
  };

  const navigateTo = (screen) => {
    setCurrentScreen(screen);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'login':
        return <Login onLoginSuccess={handleLoginSuccess} navigateTo={navigateTo} />;
      case 'menu':
        return <Menu onLogout={handleLogout} navigateTo={navigateTo} />;
      case 'cadastro':
        return <Cadastro navigateTo={navigateTo} />;
      case 'estoque':
        return <Estoque goBack={() => navigateTo('menu')} />;
      case 'adicionar-produto':
        return <AdicionarProduto goBack={() => navigateTo('menu')} />;
      case 'gerenciar-usuarios':
        return <GerenciarUsuarios goBack={() => navigateTo('menu')} />;
      case 'relatorio-estoque':
        return <RelatorioEstoque goBack={() => navigateTo('menu')} />;
      case 'clientes':
        return <Clientes goBack={() => navigateTo('menu')} />;
      default:
        return <Login onLoginSuccess={handleLoginSuccess} navigateTo={navigateTo} />;
    }
  };

  return <div className="App">{renderScreen()}</div>;
}

export default App;