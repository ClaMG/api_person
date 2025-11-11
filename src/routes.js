import { Router } from "express";
import {createTable, insertUsuario, updateUsuario, selectUsuarios, selectUsuario, deleteUsuario, testAutorizar, logar, api} from './Controler/Pessoa.js';

import { authToken } from './authToken.js';
import { authenticateApiKey } from './middleware.js';

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
router.get('/protected',authToken, testAutorizar);//Rota protegida
router.post('/login', logar);//Rota de login
router.get('/api/dados-protegidos', authenticateApiKey, api);//Rota protegida por API Key

export default router;