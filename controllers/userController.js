const {response, request} = require('express');
const {Common} = require("../helpers/common");
const UserQuery = require("../database/query/UserQuery");
const TaskQuery = require("../database/query/TaskQuery");
const bcrypt = require("bcrypt");
const {generateToken} = require("../helpers/generateToken");
const {use} = require("bcrypt/promises");
const {modifyUser} = require("../database/query/UserQuery");
const {roleNames} = require("../helpers/constants");

class UserController {
    static find = async (email) => {
        const user = await UserQuery.listUser(email);

        if (!user) return false

        return user;
    };

    static findDevelopers = async () => {
        const user = await UserQuery.findDevelopers();

        if (!user) return false

        return user;
    };

    static findAll = async () => {
        const user = await UserQuery.listAllUsers();

        if (!user) return false

        return user;
    };

    static save = async (user) => {
        user.password = await UserController.hashPasswordIfExists(user.password);

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

    static register = async (email, password, name, surname, secondSurname) => {
        const user = {
            email: email,
            password: password,
            name: name,
            surname: surname,
            secondSurname: secondSurname,
        }

        user.password = await UserController.hashPasswordIfExists(user.password);
        user.role = roleNames.developer;

        const created = await UserQuery.createUser(user);

        if (!created) return false;

        return created
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

    static getRanking = async (count) => {
        return await UserQuery.getRanking(count)
    };

    static changePassword = async (email, password) => {
        return await UserQuery.getRanking(count)
    };
}

module.exports = {
    UserController
};