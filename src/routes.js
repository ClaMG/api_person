import { Router } from "express";
import {insertUsuario, updateUsuario, selectUsuarios, selectUsuario, deleteUsuario, autorizarUser, logar, authenticateApiKey} from './Controler/Pessoa.js';

import { authToken } from './authToken.js';
import { middle } from './middle.js';

const router = Router();



router.get('/', (req, res) => {
    res.json({
        "statusCode": 200,
        "msg": "API Funcionando"
    })
});


router.get('/users', selectUsuarios);//Leitura de todas as pessoas
router.get('/user', selectUsuario);//Leitura de uma pessoa
router.put('/user', updateUsuario);//Atualização dos dados de uma pessoa
router.post('/user', insertUsuario);//Inserção de uma nova pessoa
router.delete('/user', deleteUsuario);//Deleção de uma pessoa
router.get('/protected',authToken, autorizarUser);//Rota protegida
router.post('/login', logar);//Rota de login
router.get('/api/dados-protegidos', middle, authenticateApiKey);//Rota protegida por API Key

export default router;