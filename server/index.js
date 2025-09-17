const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// Configuração da conexão com o MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Programando21@', // Sua senha do MySQL Server
  database: 'garritano_db'
});

db.connect(err => {
  if (err) {
    console.error('Erro ao conectar ao MySQL:', err);
    return;
  }
  console.log('Conectado ao banco de dados MySQL!');
});

// --- Rotas da API ---

// Rota de Cadastro de Usuário
app.post('/api/cadastro', (req, res) => {
  const { nome, usuario, email, senha, telefone, role, cargo, setor } = req.body;
  const sql = 'INSERT INTO usuarios (nome, usuario, email, senha, telefone, role, cargo, setor) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
  
  db.query(sql, [nome, usuario, email, senha, telefone, role, cargo, setor], (err, result) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(400).json({ error: 'Este e-mail já está cadastrado.' });
      }
      console.error(err);
      return res.status(500).json({ error: 'Erro ao cadastrar usuário.' });
    }
    res.status(201).json({ id: result.insertId, nome, email, role });
  });
});

// Rota de Login
app.post('/api/login', (req, res) => {
  const { email, senha } = req.body;
  const sql = 'SELECT email, role FROM usuarios WHERE email = ? AND senha = ?';
  
  db.query(sql, [email, senha], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erro no login.' });
    }
    if (results.length > 0) {
      res.status(200).json({ success: true, role: results[0].role });
    } else {
      res.status(401).json({ success: false, message: 'E-mail ou senha incorretos.' });
    }
  });
});

// Rota para adicionar um novo produto ao estoque
app.post('/api/adicionar-produto', (req, res) => {
  const { nome, tipo, quantidade, validade, qr_code } = req.body;
  const sql = 'INSERT INTO estoque (nome, tipo, quantidade, validade, qr_code) VALUES (?, ?, ?, ?, ?)';
  
  db.query(sql, [nome, tipo, quantidade, validade, qr_code], (err, result) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(400).json({ error: 'Este código QR já está cadastrado.' });
      }
      console.error(err);
      return res.status(500).json({ error: 'Erro ao adicionar produto.' });
    }
    res.status(201).json({ id: result.insertId, nome, tipo, quantidade });
  });
});

// Rota para buscar todos os itens do estoque
app.get('/api/estoque', (req, res) => {
  const sql = 'SELECT * FROM estoque';
  db.query(sql, (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erro ao buscar itens do estoque.' });
    }
    res.status(200).json(rows);
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});