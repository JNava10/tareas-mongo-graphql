const express = require('express');
const constants = require('../helpers/constants');
const cors = require('cors');
const mongoose = require("mongoose");
mongoose.set('strictQuery', false);
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4')
const typeDefs = require('../typeDefs/typeDefs.js');
const resolvers = require('../resolvers/resolvers.js');

class Server {
    constructor() {
        this.app = express();
        this.baseRoute = constants.baseRoute;
        this.graphQLPath = '/graphql';

        this.conectarMongoose();
        this.middlewares();
        this.routes();

        this.serverGraphQL =  new ApolloServer({ typeDefs, resolvers , formatError: (error) => {
            return { message: error.message };
        }});
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

    async start() {
        await this.serverGraphQL.start();
        this.applyGraphQLMiddleware();
        this.listen();
    }

    listen() {
        this.app.listen(process.env.PORT, () => {
            console.log(`Servidor escuchando en: ${process.env.URL}:${process.env.PORT}${this.graphQLPath}`);
        })
        this.applyGraphQLMiddleware()
    }

    applyGraphQLMiddleware() {
        this.app.use(this.graphQLPath , express.json(), expressMiddleware(this.serverGraphQL));
    }

}

module.exports = Server;