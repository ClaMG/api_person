import dotenv from 'dotenv';
dotenv.config();
const API_KEY_SECRET = process.env.API_KEY_SECRET || "your_api_key_secret_here";


const middle = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    
    // Verifica se o cabeçalho existe e começa com "Bearer "
    if (authHeader && authHeader.startsWith('Bearer ')) {
        // Pega apenas a chave, removendo "Bearer " (que tem 7 caracteres: B-e-a-r-e-r-espaço)
        const token = authHeader.substring(7); 
        
        if (token === API_KEY_SECRET) {
            return next();
        }
    } 

    res.status(401).send('Acesso não autorizado. Chave de API inválida ou ausente.');
};


export { middle };