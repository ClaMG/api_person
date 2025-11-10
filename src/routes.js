import { Router } from "express";
import {createTable, insertUsuario, updateUsuario, selectUsuarios, selectUsuario, deleteUsuario} from './Controler/Pessoa.js';

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

export default router;