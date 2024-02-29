const {Common} = require("../helpers/common");
const UserQuery = require("../database/query/UserQuery");
const {generateToken} = require("../helpers/generateToken");
const {response} = require("express");
const bcrypt = require("bcrypt");

const login = async (email, password) => {
    const user = await UserQuery.listUser(email);

    if (!user) return false

    const passwordIsValid = await bcrypt.compare(password, user.password);

    if (passwordIsValid) {
        const token = generateToken(user.email)

        return {
            email: user.email,
            token: token
        }
    } else {
        return false
    }
};

module.exports = {
    login
};