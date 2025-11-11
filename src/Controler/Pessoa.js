import{openDb}from'../configDB.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();



export async function createTable(){
    openDb().then(db=>{
        db.exec('CREATE TABLE IF NOT EXISTS Usuarisos (id INTEGER PRIMARY KEY, usuario TEXT, senha TEXT, nome TEXT, idade INTEGER, cpf CHAR(11), telefone CHAR(11), email TEXT)');
    })
}

export async function insertUsuario(req, res){
    let user = req.body;
    openDb().then(db=>{
        db.run('INSERT INTO Usuarios (usuario, senha, nome, idade, cpf, telefone, email) VALUES (?, ?, ?, ?, ?, ?, ?)', [user.usuario, user.senha, user.nome, user.idade, user.cpf, user.telefone, user.email]);
    });
    res.json({
        "statuscode": 200
    });
}

export async function updateUsuario(req, res){
    let user = req.body;
    openDb().then(db=>{
        db.run('UPDATE Usuarios SET usuario=?, senha=?, nome = ?, idade = ?, cpf=?, telefone=?, email=? WHERE id = ?', [user.usuario, user.senha, user.nome, user.idade, user.cpf, user.telefone, user.email, user.id]);
    });
    res.json({
        "statuscode": 200
    }); 
}

export async function selectUsuarios(req, res){
     openDb().then(db=>{
        db.all('SELECT * FROM Usuarios')
        .then(users=>res.json(users))
    });
}

export async function selectUsuario(req, res){
    let id = req.body.id;
     openDb().then(db=>{
        db.get('SELECT * FROM Usuarios WHERE id = ?', [id])
        .then(user=>res.json(user));
    });
}

export async function deleteUsuario(req, res){
    let id = req.body.id;
     openDb().then(db=>{
        db.get('DELETE FROM Usuarios WHERE id = ?', [id])
        .then(user=>res.json(user));
    });
    res.json({
        "statuscode": 200
    }); 
}


export async function logar(req, res){
    const USER = [{id: 1, username: 'admin', password: '1234'}];
    const secretKey = process.env.JWT_SECRET || 'secretayour_super_secret_key_here';

    const config = {
        user: 'username',
        password: 'password'
    };

    /*
    var poolConnection = await sql.connect(config);

        // Execute a consulta
        var resultSet = await poolConnection.request().query(`SELECT usuario * FROM Usuario`);

        // Atribua os dados à variável
        // A resposta está em resultSet.recordset, que é um array de objetos
        const dadosDaBusca = resultSet.recordset;

        console.log('Dados obtidos:', dadosDaBusca);
        */

    const {username, password} = req.body;
    const user = USER.find(u => u.username === username && u.password === password);
    
    if (!user) {
        return res.status(401).json({message: 'Credenciais inválidas'});
    }
    
    
    if (!secretKey) {
        console.error('JWT_SECRET not defined in .env');
        return res.status(500).json({message: 'Erro interno do servidor' });
    }

    const payload = {id: user.id};

    const token = jwt.sign(payload, secretKey, {expiresIn: '1h'});
    res.json({token});
}

export async function testAutorizar(req, res){
     res.json({message: 'Acesso concedido a rota protegida'}); 
}

export async function api(req, res){
    res.json({ mensagem: 'Dados confidenciais acessados com sucesso!' });
}