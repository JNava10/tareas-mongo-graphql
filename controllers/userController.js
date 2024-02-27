const {response, request} = require('express');
const {Common} = require("../helpers/common");
const UserQuery = require("../database/query/UserQuery");
const TaskQuery = require("../database/query/TaskQuery");
const bcrypt = require("bcrypt");
const {generateToken} = require("../helpers/generateToken");
const {use} = require("bcrypt/promises");

class UserController {
    static find = async (email) => {
        const user = await UserQuery.listUser(email);

        if (!user) return false

        console.log(user)

        return user;
    };

    static findAll = async () => {
        const user = await UserQuery.listAllUsers();

        if (!user.item) return false

        return user;
    };

    static save = async (user) => {
        user.password = await UserController.hashPasswordIfExists(user.password);

        let created = await UserQuery.createUser(user);

        if (!created) {
            return false
        }

        return created
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

    static hashPasswordIfExists = async (password) => {
        return await bcrypt.hash(password, 10);
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