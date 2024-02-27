const {response, request} = require('express');
const {Common} = require("../helpers/common");
const UserQuery = require("../database/query/UserQuery");
const TaskQuery = require("../database/query/TaskQuery");
const bcrypt = require("bcrypt");
const {generateToken} = require("../helpers/generateToken");
const {use} = require("bcrypt/promises");
const {modifyUser} = require("../database/query/UserQuery");

class UserController {
    static find = async (email) => {
        const user = await UserQuery.listUser(email);

        if (!user) return false

        return user;
    };

    static findAll = async () => {
        const user = await UserQuery.listAllUsers();

        if (!user.item) return false

        return user;
    };

    static save = async (user) => {
        user.password = await UserController.hashPasswordIfExists(user.password);

        console.log(user)

        const created = await UserQuery.createUser(user);


        if (!created) {
            return false
        }

        return created
    };

    static modify = async (email, user) => {
        try {
            return await UserQuery.modifyUser(email, user);
        } catch (error) {
            console.log(error);
            return false
        }
    };

    static hashPasswordIfExists = async (password) => {
        return await bcrypt.hash(password, 10);
    }

    static delete = async (email) => {
        try {
            return await UserQuery.deleteUser(email);
        } catch (error) {
            console.log(error);
            return false
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