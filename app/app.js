require('dotenv').config();

const Server = require('./server');
const server = new Server();

server.start().catch(console.error);

console.log(`Server listening on http://127.0.0.1:${process.env.PORT}`);

