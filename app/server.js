const express = require('express');
const constants = require('../helpers/constants');
const cors = require('cors');
const mongoose = require("mongoose");
mongoose.set('strictQuery', false);

class Server {
    constructor() {
        this.app = express();
        this.baseRoute = constants.baseRoute;

        this.conectarMongoose();
        this.middlewares();
        this.routes();
    }

    conectarMongoose() {
        mongoose.connect('mongodb://' + process.env.DB_URL + ':' + process.env.DB_PORT + '/' + process.env.DB_DATABASE, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        this.db = mongoose.connection;
        this.db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
        this.db.once('open', () => {console.log('Conexión exitosa a MongoDB');});
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
    }

    routes(){
        this.app.use(this.baseRoute, require('../routes/taskRoutes'));
        this.app.use(this.baseRoute, require('../routes/userRoutes'));
        // this.app.use(this.baseRoute, require('../routes/authRoutes'));
    }

    listen() {
        this.app.listen(process.env.PORT, () => {
            console.log(`Servidor escuchando en: ${process.env.PORT}`);
        })
    }
}

module.exports = Server;