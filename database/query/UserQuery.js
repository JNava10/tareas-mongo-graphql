const UserModel = require('../../models/user')

const errorCodes = require('../../helpers/customErrorCodes')
const listAllUsers = async () => {
    try {
        const foundUser = await UserModel.find();

        if (!foundUser) return false;

        return {item: foundUser}
    } catch (error) {
        return {
            inserted: false,
            error: error.message
        }
    }
};

const createUser = async (user) =>  {
    try {
        return await UserModel.create(user);
    } catch (error) {
        if (error.code === errorCodes.DUPLICATE_KEY_ERROR) return "Se ha intentado insertar un email duplicado."

        return error.message
    }
}

const listUser = async (email) =>  {
    try {
        const foundUser = await UserModel.findOne({email: email});

        if (!foundUser) return false;

        return foundUser
    } catch (error) {
        return {
            inserted: false,
            error: error.message
        }
    }
}

const modifyUser = async (email, user) =>  {
    try {
        const userExists = await listUser(user)

        if (!userExists.item) return "Usuario no encontrado.";

        const updatedUser = await UserModel.updateOne(
            {email: email},
            user,
            { new: false }
        );

        if (!updatedUser) return false

        return updatedUser
    } catch (error) {
        console.error(error)
        return null
    }
}

const deleteUser = async (email) => {
    try {
        const userExists = await listUser(email)

        if (!userExists) return false;

        const deleted = await UserModel.deleteOne(
            {email: email},
            {new: false}
        );

        console.log(deleted)

        return deleted.deletedCount > 0
    } catch (error) {
        console.error(error)
        return null
    }
}

const getRanking = async (req) => {
    try {
        const rows = await UserModel
            .find({realizedTasks: {$gt: 0}})
            .sort({realizedTask: -1})

        if (!rows) return false

        return rows
    } catch (error) {
        console.error(error)
        return null
    }
};

const getUserRoles = async (email) => {
    try {
        const rows = await UserModel
            .find({email: email})

        if (!rows) return false

        return rows
    } catch (error) {
        console.error(error)
        return null
    }
};

module.exports = {
    createUser,
    listUser,
    deleteUser,
    modifyUser,
    getRanking,
    listAllUsers
}