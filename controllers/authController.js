const {Common} = require("../helpers/common");
const UserQuery = require("../database/query/UserQuery");
const {generateToken} = require("../helpers/generateToken");
const {response} = require("express");
const bcrypt = require("bcrypt");

const login = async (req, res = response) => {
    const user = await UserQuery.listUser(req);

    if (!user) return res.status(404).json("Usuario no encontrado.");

    const passwordIsValid = await bcrypt.compare(req.body.password, user.item.password);

    if (req.body.email === user.item.email && passwordIsValid) {
        const token = generateToken(user.email)

        return res.status(200).json(token);
    } else {
        return res.status(400).json("Credenciales no validos.");
    }
};

module.exports = {
    login
};