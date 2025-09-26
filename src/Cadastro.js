import React, { useState, useEffect } from 'react';
import backgroundImage from './assets/garritano.jpg';

const Cadastro = ({ navigateTo }) => {
  const [nome, setNome] = useState('');
  const [usuario, setUsuario] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [cargo_id, setCargoId] = useState('');
  const [setor_id, setSetorId] = useState('');

  const [cargos, setCargos] = useState([]);
  const [setores, setSetores] = useState([]);

  useEffect(() => {
    const mockCargos = [
      { id: 1, nome: 'Administrador' },
      { id: 2, nome: 'Gerente' },
      { id: 3, nome: 'Vendedor' }
    ];
    const mockSetores = [
      { id: 1, nome: 'Administrativo' },
      { id: 2, nome: 'Vendas' },
      { id: 3, nome: 'Depósito' }
    ];
    setCargos(mockCargos);
    setSetores(mockSetores);
  }, []);

  const handleSave = async () => {
    if (!nome || !usuario || !email || !senha || !confirmarSenha || !cargo_id || !setor_id) {
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
          cargo_id,
          setor_id,
          ativo: 1,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Usuário cadastrado com sucesso!');
        navigateTo('login');
      } else {
        alert(data.message || 'Erro ao cadastrar usuário.');
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
          <label htmlFor="nome" style={styles.label}>Nome Completo:</label>
          <input id="nome" type="text" style={styles.input} placeholder="Nome completo" value={nome} onChange={(e) => setNome(e.target.value)} />
        </div>

        <div style={styles.inputGroup}>
          <label htmlFor="usuario" style={styles.label}>Usuário:</label>
          <input id="usuario" type="text" style={styles.input} placeholder="Nome de usuário" value={usuario} onChange={(e) => setUsuario(e.target.value)} />
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
          <select id="cargo" style={styles.input} value={cargo_id} onChange={(e) => setCargoId(e.target.value)}>
            <option value="">Selecione o Cargo</option>
            {cargos.map(cargo => (
              <option key={cargo.id} value={cargo.id}>{cargo.nome}</option>
            ))}
          </select>
        </div>

        <div style={styles.inputGroup}>
          <label htmlFor="setor" style={styles.label}>Setor:</label>
          <select id="setor" style={styles.input} value={setor_id} onChange={(e) => setSetorId(e.target.value)}>
            <option value="">Selecione o Setor</option>
            {setores.map(setor => (
              <option key={setor.id} value={setor.id}>{setor.nome}</option>
            ))}
          </select>
        </div>

        <button style={styles.button} onClick={handleSave}>Cadastrar</button>
        <button style={{ ...styles.button, ...styles.backButton }} onClick={() => navigateTo('login')}>Voltar ao Login</button>
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