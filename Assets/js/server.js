const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors'); // Importar o pacote cors
const app = express();
const port = 3000;

app.use(cors()); // Usar o middleware cors para permitir requisições de qualquer origem
app.use(bodyParser.json());

app.post('/save', (req, res) => {
    const { id, confirma, nome, comentarios } = req.body;
    const data = `${id} ${confirma} ${nome} ${comentarios}\n`;

    fs.appendFile('dados.txt', data, (err) => {
        if (err) {
            console.error('Erro ao escrever no arquivo:', err);
            return res.status(500).send('Erro ao salvar os dados.');
        }
        res.send('Dados salvos com sucesso.');
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
