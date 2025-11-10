import{openDb}from'../configDB.js';

export async function createTable(){
    openDb().then(db=>{
        db.exec('CREATE TABLE IF NOT EXISTS Usuarisos (id INTEGER PRIMARY KEY, nome TEXT, idade INTEGER, cpf CHAR(11), telefone CHAR(11), email TEXT)');
    })
}

export async function insertUsuario(req, res){
    let user = req.body;
    openDb().then(db=>{
        db.run('INSERT INTO Usuarios (nome, idade, cpf, telefone, email) VALUES (?, ?, ?, ?, ?)', [user.nome, user.idade, user.cpf, user.telefone, user.email]);
    });
    res.json({
        "statuscode": 200
    });
}

export async function updateUsuario(req, res){
    let user = req.body;
    openDb().then(db=>{
        db.run('UPDATE Usuarios SET nome = ?, idade = ?, cpf=?, telefone=?, email=? WHERE id = ?', [user.nome, user.idade, user.cpf, user.telefone, user.email, user.id]);
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
