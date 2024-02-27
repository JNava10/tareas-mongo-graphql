const jwt = require('jsonwebtoken')


const generateToken = (email) => jwt.sign({email}, process.env.PRIVATE_TOKEN_KEY, {expiresIn: '4h'})

module.exports = {
    generateToken
}


let blacklistedTokens = [];

// const revokeToken = (token) => {
//     blacklistedTokens.push(token);
//  }
//
//  const verifyToken = (token) => {
//     if (blacklistedTokens.includes(token)) {
//         throw new Error('Token has been revoked');
//     }
//
//     // Verificar el token...
// }