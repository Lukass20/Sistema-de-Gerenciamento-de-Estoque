const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'garritano_database'
});

db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  }
  console.log('Conectado ao banco de dados com sucesso.');
});

app.post('/api/login', (req, res) => {
  const { usuario, senha } = req.body;
  const query = 'SELECT f.id, f.nome_completo, f.email, c.nome AS role FROM funcionarios f JOIN cargos c ON f.cargo_id = c.id WHERE f.usuario = ? AND f.senha = ?';
  db.query(query, [usuario, senha], (err, results) => {
    if (err) {
      console.error('Erro na consulta:', err);
      return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
    if (results.length > 0) {
      res.status(200).json({ message: 'Login realizado com sucesso.', user: { nome: results[0].nome_completo, role: results[0].role } });
    } else {
      res.status(401).json({ message: 'Usuário ou senha incorretos.' });
    }
  });
});

app.post('/api/cadastro', (req, res) => {
  const { nome, usuario, email, senha, cargo_id, setor_id, ativo } = req.body;
  const sql = 'INSERT INTO funcionarios (nome_completo, usuario, email, senha, cargo_id, setor_id, ativo, data_cadastro) VALUES (?, ?, ?, ?, ?, ?, ?, NOW())';
  
  db.query(sql, [nome, usuario, email, senha, cargo_id, setor_id, ativo], (err, result) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(400).json({ error: 'Usuário, e-mail ou outro campo único já está cadastrado.' });
      }
      console.error('Erro no cadastro:', err);
      return res.status(500).json({ error: 'Erro ao cadastrar usuário.' });
    }
    res.status(201).json({ message: 'Usuário cadastrado com sucesso!', id: result.insertId });
  });
});

app.get('/api/estoque', (req, res) => {
  const query = 'SELECT * FROM produtos';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Erro ao buscar estoque:', err);
      return res.status(500).json({ message: 'Erro ao buscar estoque.' });
    }
    res.status(200).json(results);
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});