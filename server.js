require('dotenv').config();
const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Middleware para servir arquivos estáticos
app.use(express.static('public'));
app.use(express.json());

// Endpoint para responder ao chatbot
app.post('/chat', (req, res) => {
    const userMessage = req.body.message.toLowerCase();
    
    fs.readFile('responses.json', 'utf8', (err, data) => {
        if (err) return res.status(500).send({ reply: 'Erro interno no servidor.' });

        const responses = JSON.parse(data);
        const reply = responses[userMessage] || "Desculpa, não entendi. Pode reformular a pergunta?";
        res.send({ reply });
    });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
