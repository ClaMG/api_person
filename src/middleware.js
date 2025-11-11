import dotenv from 'dotenv';
dotenv.config();
const API_KEY_SECRET = process.env.API_KEY_SECRET || "your_api_key_secret_here";


const authenticateApiKey = (req, res, next) => {
    // A chave pode vir em um cabeçalho (header) chamado 'x-api-key' ou 'Authorization'
    const apiKey = req.header('x-api-key');

    if (apiKey && apiKey === API_KEY_SECRET) {
        // Se a chave for válida, continua para a próxima função (a rota em si)
        next();
    } else {
        // Caso contrário, retorna um erro de não autorizado
        res.status(401).send('Acesso não autorizado. Chave de API inválida ou ausente.');
    }
};


export { authenticateApiKey };