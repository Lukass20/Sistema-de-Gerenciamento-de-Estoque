import React, { useState } from 'react';
import Login from './Login';
import Menu from './Menu';
import Clientes from './Clientes';
import Estoque from './Estoque';
import Cadastro from './Cadastro';
import AdicionarProduto from './AdicionarProduto'; 

// Componente principal que gerencia a navegação entre as telas
const App = () => {
  const [currentScreen, setCurrentScreen] = useState('Login');

  const navigate = (screen) => {
    setCurrentScreen(screen);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'Menu':
        return <Menu navigate={navigate} />;
      case 'Clientes':
        return <Clientes navigate={navigate} />;
      case 'Estoque':
        return <Estoque navigate={navigate} />;
      case 'Cadastro':
        return <Cadastro navigate={navigate} />;
      case 'AdicionarProduto': 
        return <AdicionarProduto navigate={navigate} />;
      case 'Login':
      default:
        return <Login navigate={navigate} />;
    }
  };

  return (
    <div>
      {renderScreen()}
    </div>
  );
};

export default App;