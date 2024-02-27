const jwt = require('jsonwebtoken');

const validateToken = (req , res , next) => {
    const token = req.header('x-token');

    if (!token){
        return res.status(401).json('Debe introducirse el token en la peticion.');
    }

    try {
        const {email} = jwt.verify(token, process.env.PRIVATE_TOKEN_KEY);

        req.userId = email;

        next();
    } catch (error){
        return res.status(403).json('Token no valido.');
    }
}

module.exports = {
    validateToken
}