//import {openDb} from './configDB.js';
import {createTable, insertPessoa, updatePessoa, selectPessoas, selectPessoa} from './Controler/Pessoa.js';

import express from 'express';
const app = express();
app.use(express.json());

createTable();

app.get('/', function (req, res) {
  res.send('Funcionando a API');
});

app.get('/pessoas', async function (req, res) {
  let pessoas = await selectPessoas();
    res.json(pessoas);
});

app.get('/pessoa', async function (req, res) {
  let pessoa = await selectPessoa(req.body.id);
    res.json(pessoa);
});

app.post('/pessoa', function(req, res){
    insertPessoa(req.body);
    res.json({
        "statuscode": 200
    })
});

app.put('/pessoa', function(req, res){
    if(!req.body.id && req.body){
        res.json({
            "statuscode": 400,
            "mensagem": "Informe um id"
        })
    }

    updatePessoa(req.body);
    res.json({
        "statuscode": 200
    })
});

app.listen(3000, ()=>console.log("Api Rodando."))