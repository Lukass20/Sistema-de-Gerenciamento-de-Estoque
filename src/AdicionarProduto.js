import React, { useState } from 'react';
import backgroundImage from './assets/garritano.jpg';

const AdicionarProduto = ({ navigate }) => {
  const [nome, setNome] = useState('');
  const [tipo, setTipo] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [validade, setValidade] = useState('');
  const [qrCode, setQrCode] = useState('');
  const [error, setError] = useState('');

  const handleSave = async () => {
    if (!nome || !tipo || !quantidade || !validade) {
      setError('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/api/adicionar-produto', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome,
          tipo,
          quantidade: parseInt(quantidade),
          validade,
          qr_code: qrCode,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Produto adicionado ao estoque com sucesso!');
        setNome('');
        setTipo('');
        setQuantidade('');
        setValidade('');
        setQrCode('');
        setError('');
      } else {
        setError(data.error || 'Erro ao adicionar produto.');
      }
    } catch (err) {
      setError('Não foi possível conectar ao servidor. Verifique se o servidor está rodando.');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Adicionar Novo Produto</h1>
        {error && <p style={styles.errorText}>{error}</p>}

        <div style={styles.inputGroup}>
          <label htmlFor="nome" style={styles.label}>Nome do Produto:</label>
          <input id="nome" type="text" style={styles.input} placeholder="Ex: Arroz Integral" value={nome} onChange={(e) => setNome(e.target.value)} />
        </div>
        <div style={styles.inputGroup}>
          <label htmlFor="tipo" style={styles.label}>Tipo:</label>
          <input id="tipo" type="text" style={styles.input} placeholder="Ex: Alimento" value={tipo} onChange={(e) => setTipo(e.target.value)} />
        </div>
        <div style={styles.inputGroup}>
          <label htmlFor="quantidade" style={styles.label}>Quantidade:</label>
          <input id="quantidade" type="number" style={styles.input} placeholder="Ex: 100" value={quantidade} onChange={(e) => setQuantidade(e.target.value)} />
        </div>
        <div style={styles.inputGroup}>
          <label htmlFor="validade" style={styles.label}>Validade:</label>
          <input id="validade" type="date" style={styles.input} value={validade} onChange={(e) => setValidade(e.target.value)} />
        </div>
        <div style={styles.inputGroup}>
          <label htmlFor="qrCode" style={styles.label}>Código QR:</label>
          <input id="qrCode" type="text" style={styles.input} placeholder="Digite o código ou use o leitor" value={qrCode} onChange={(e) => setQrCode(e.target.value)} />
        </div>
        
        <button style={styles.button} onClick={handleSave}>Salvar Produto</button>
        <button style={{ ...styles.button, ...styles.backButton }} onClick={() => navigate('Estoque')}>Voltar</button>
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
  },
  errorText: {
    color: '#dc3545',
    marginBottom: '10px',
  }
};

export default AdicionarProduto;