import React, { useState } from 'react';
import backgroundImage from './assets/garritano.jpg';

const Cadastro = ({ navigate }) => {
  const [nome, setNome] = useState('');
  const [usuario, setUsuario] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cargo, setCargo] = useState('');
  const [setor, setSetor] = useState('');

  const handleSave = async () => {
    if (!nome || !email || !senha || !confirmarSenha || !cargo || !setor) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    if (senha !== confirmarSenha) {
      alert('A senha e a confirmação de senha não coincidem.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/api/cadastro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome,
          usuario, 
          email,
          senha,
          telefone,
          role: 'funcionario',
          cargo,
          setor,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Usuário cadastrado com sucesso!');
        navigate('Login');
      } else {
        alert(data.error || 'Erro ao cadastrar usuário.');
      }
    } catch (err) {
      alert('Não foi possível conectar ao servidor. Verifique se o servidor está rodando.');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Cadastro de Usuário</h1>
        
        <div style={styles.inputGroup}>
          <label htmlFor="nome" style={styles.label}>Nome:</label>
          <input id="nome" type="text" style={styles.input} placeholder="Nome completo" value={nome} onChange={(e) => setNome(e.target.value)} />
        </div>

        <div style={styles.inputGroup}>
          <label htmlFor="email" style={styles.label}>E-mail:</label>
          <input id="email" type="email" style={styles.input} placeholder="exemplo@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div style={styles.inputGroup}>
          <label htmlFor="senha" style={styles.label}>Senha:</label>
          <input id="senha" type="password" style={styles.input} placeholder="Digite uma senha" value={senha} onChange={(e) => setSenha(e.target.value)} />
        </div>

        <div style={styles.inputGroup}>
          <label htmlFor="confirmarSenha" style={styles.label}>Confirmar Senha:</label>
          <input id="confirmarSenha" type="password" style={styles.input} placeholder="Confirme a senha" value={confirmarSenha} onChange={(e) => setConfirmarSenha(e.target.value)} />
        </div>
        
        <div style={styles.inputGroup}>
          <label htmlFor="cargo" style={styles.label}>Cargo:</label>
          <input id="cargo" type="text" style={styles.input} placeholder="Ex: Gerente" value={cargo} onChange={(e) => setCargo(e.target.value)} />
        </div>

        <div style={styles.inputGroup}>
          <label htmlFor="setor" style={styles.label}>Setor:</label>
          <input id="setor" type="text" style={styles.input} placeholder="Ex: Vendas" value={setor} onChange={(e) => setSetor(e.target.value)} />
        </div>

        <button style={styles.button} onClick={handleSave}>Cadastrar</button>
        <button style={{ ...styles.button, ...styles.backButton }} onClick={() => navigate('Login')}>Voltar ao Login</button>
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
    backgroundColor: '#28a745',
    color: 'white',
    fontWeight: 'bold',
    marginTop: '10px',
  },
  backButton: {
    backgroundColor: '#6c757d',
    marginTop: '10px',
  }
};

export default Cadastro;