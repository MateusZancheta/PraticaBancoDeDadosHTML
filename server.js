const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

// Configura o middleware para analisar o corpo das requisições
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configura o banco de dados MySQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'cadastro_nomes'
});

// Conecta ao banco de dados
connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conectado ao banco de dados MySQL');
});

// Servir arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Rota principal para servir o arquivo HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Rota para cadastrar o nome
app.post('/cadastrar', (req, res) => {
    const { nome } = req.body;

    const sql = 'INSERT INTO pessoas (nome) VALUES (?)';
    connection.query(sql, [nome], (err, result) => {
        if (err) {
            console.error('Erro ao inserir no banco de dados:', err);
            res.status(500).json({ message: 'Erro ao cadastrar o nome' });
            return;
        }
        res.status(200).json({ message: 'Nome cadastrado com sucesso!' });
    });
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});