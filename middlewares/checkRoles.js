const { validationResult } = require('express-validator');
const UserQuery = require("../database/query/UserQuery");
const contants = require("../helpers/constants");
const checkAdminRole = async (req, res, next) => {
    const user = await UserQuery.listUser(req);

    if (!user.item) return res.status(400).json("Usuario no encontrado.")

    if (user.item.role !== contants.roleNames.admin) return res.status(403).json("No tienes permisos.")

    next();
}

const checkDeveloperRole = async (req, res, next) => {
    const user = await UserQuery.listUser(req);

    if (!user.item) return res.status(400).json("Usuario no encontrado.")

    if (user.item.role !== contants.roleNames.developer) return res.status(403).json("No tienes permisos.")

    next();
}

module.exports = {
    checkAdminRole,
    checkDeveloperRole
}
