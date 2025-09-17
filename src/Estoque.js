import React, { useState, useEffect } from 'react';
import backgroundImage from './assets/garritano.jpg';

const Estoque = ({ navigate }) => {
  const [produtos, setProdutos] = useState([]);
  const [nome, setNome] = useState('');
  const [tipo, setTipo] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [validade, setValidade] = useState('');
  const [qrCode, setQrCode] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchProdutos = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/estoque');
      if (response.ok) {
        const data = await response.json();
        setProdutos(data);
      } else {
        console.error('Erro ao buscar produtos:', await response.text());
      }
    } catch (err) {
      console.error('Não foi possível conectar ao servidor:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProdutos();
  }, []);

  const handleAdicionarProduto = async () => {
    if (!nome || !quantidade || !qrCode) {
      alert('Por favor, preencha todos os campos obrigatórios: Nome, Quantidade e QR Code.');
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
          quantidade: parseInt(quantidade, 10),
          validade,
          qr_code: qrCode,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Produto adicionado com sucesso!');
        setNome('');
        setTipo('');
        setQuantidade('');
        setValidade('');
        setQrCode('');
        fetchProdutos(); // Atualiza a lista de produtos após adicionar um novo
      } else {
        alert(data.error || 'Erro ao adicionar produto.');
      }
    } catch (err) {
      alert('Não foi possível conectar ao servidor. Verifique se o servidor está rodando.');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Gerenciar Estoque</h1>

        {/* Formulário para adicionar novo produto */}
        <div style={styles.formSection}>
          <h2 style={styles.subtitle}>Adicionar Novo Produto</h2>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Nome:</label>
            <input type="text" style={styles.input} value={nome} onChange={(e) => setNome(e.target.value)} />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Tipo:</label>
            <input type="text" style={styles.input} value={tipo} onChange={(e) => setTipo(e.target.value)} />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Quantidade:</label>
            <input type="number" style={styles.input} value={quantidade} onChange={(e) => setQuantidade(e.target.value)} />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Validade:</label>
            <input type="date" style={styles.input} value={validade} onChange={(e) => setValidade(e.target.value)} />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>QR Code:</label>
            <input type="text" style={styles.input} value={qrCode} onChange={(e) => setQrCode(e.target.value)} />
          </div>
          <button style={styles.button} onClick={handleAdicionarProduto}>Adicionar Produto</button>
        </div>

        {/* Tabela de produtos */}
        <div style={styles.tableSection}>
          <h2 style={styles.subtitle}>Itens em Estoque</h2>
          {loading ? (
            <p>Carregando produtos...</p>
          ) : (
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Nome</th>
                  <th style={styles.th}>Tipo</th>
                  <th style={styles.th}>Quantidade</th>
                  <th style={styles.th}>Validade</th>
                  <th style={styles.th}>QR Code</th>
                </tr>
              </thead>
              <tbody>
                {produtos.length > 0 ? (
                  produtos.map((produto) => (
                    <tr key={produto.id}>
                      <td style={styles.td}>{produto.nome}</td>
                      <td style={styles.td}>{produto.tipo}</td>
                      <td style={styles.td}>{produto.quantidade}</td>
                      <td style={styles.td}>{new Date(produto.validade).toLocaleDateString('pt-BR')}</td>
                      <td style={styles.td}>{produto.qr_code}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" style={styles.td}>Nenhum produto em estoque.</td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
        
        <button
          style={{ ...styles.button, ...styles.backButton }}
          onClick={() => navigate('Menu')}
        >
          Voltar ao Menu
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
    maxWidth: '800px',
    textAlign: 'center',
  },
  title: {
    fontSize: 28,
    marginBottom: '30px',
    color: '#333',
  },
  formSection: {
    marginBottom: '30px',
  },
  tableSection: {
    marginBottom: '30px',
  },
  subtitle: {
    fontSize: 24,
    marginBottom: '20px',
    color: '#555',
  },
  inputGroup: {
    marginBottom: '15px',
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
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
  },
  th: {
    backgroundColor: '#f2f2f2',
    padding: '12px',
    border: '1px solid #ddd',
    textAlign: 'left',
  },
  td: {
    padding: '12px',
    border: '1px solid #ddd',
    textAlign: 'left',
  },
  backButton: {
    backgroundColor: '#6c757d',
    marginTop: '10px',
  }
};

export default Estoque;