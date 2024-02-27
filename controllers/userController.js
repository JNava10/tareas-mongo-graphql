const {response, request} = require('express');
const {Common} = require("../helpers/common");
const UserQuery = require("../database/query/UserQuery");
const TaskQuery = require("../database/query/TaskQuery");
const bcrypt = require("bcrypt");
const {generateToken} = require("../helpers/generateToken");

class UserController {
    static find = async (req, res = response) => {
        const user = await UserQuery.listUser(req);

        if (!user.item) return res.status(404).json();

        return res.status(200).json(user);
    };

    static save = async (req, res = response) => {
        req.body = await UserController.hashPasswordIfExists(req.body);

        let user = await UserQuery.createUser(req);

        if (!user) {
            return res.status(400).json("No se ha creado el usuario.");
        }

        return res.status(200).json(user);
    };

    static modify = async (req, res = response) => {
        try {
            let itemUpdated = await UserQuery.modifyUser(req);

            return res.status(200).json({item: itemUpdated});
        } catch (error) {
            console.log(error);
            return res.status(200).json({error: error.message})
        }
    };

    static hashPasswordIfExists = async (requestBody) => {
        if (requestBody.password) {
            requestBody.password = await bcrypt.hash(requestBody.password, 10);
        }

        return requestBody;
    }

    static delete = async (req, res = response) => {
        try {
            let itemUpdated = await UserQuery.deleteUser(req);

            return res.status(200).json(itemUpdated);
        } catch (error) {
            console.log(error);
            return res.status(200).json({error: error.message})
        }
    };

    static getRanking = async (req, res = response) => {
        const user = await UserQuery.getRanking(req);

        if (!user) return res.status(404).json({});

        return res.status(200).json(user);
    };
}

module.exports = {
    UserController
};