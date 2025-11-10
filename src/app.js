import express from 'express';
import fs from 'fs';
import https from 'https';
import cors from 'cors';

import {createTable} from './Controler/Pessoa.js';
createTable();

const app = express();
app.use(express.json());
app.use(cors());
import jwt from 'jsonwebtoken';

const PORT = 3000;
const USER = [{id: 1, username: 'admin', password: 'password'}];

app.post('/login', (req, res) => {
    const {username, password} = req.body;
    const user = USER.find(u => u.username === username && u.password === password);
    
    if (!user) return res.status(401).json({message: 'Credenciais inválidas'});

    const token = jwt.sign({})

});



import router from './routes.js';
app.use(router);


app.listen(3000, ()=>console.log("Api Rodando."))


https.createServer({
    cert: fs.readFileSync('src/SSL/code.crt'),
    key: fs.readFileSync('src/SSL/code.key')

}, app).listen(3001, ()=>console.log("Api Rodando em HTTPS."))