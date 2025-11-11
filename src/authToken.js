import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const secretKey = process.env.JWT_SECRET || "secretayour_super_secret_key_here";


function authToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token =authHeader?.split(' ')[1];
    
    if (token == null) return res.sendStatus(401);
    
    jwt.verify(token, secretKey, (err, user) => {
        if (err) return res.sendStatus(401);
        req.user = user;
        next();
    });
}
export { authToken };