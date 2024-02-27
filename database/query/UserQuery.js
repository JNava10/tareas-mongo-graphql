
const UserModel = require('../../models/user')
const errorCodes = require('../../helpers/customErrorCodes')

const createUser = async (req) =>  {
    try {
        const createdUser = await UserModel.create(req.body);



        return createdUser;
    } catch (error) {
        if (error.code === errorCodes.DUPLICATE_KEY_ERROR) return "Se ha intentado insertar un email duplicado."

        return error.message
    }
}

const listUser = async (req) =>  {
    try {
        const foundUser = await UserModel.findOne({email: req.body.email});

        if (!foundUser) return false

        return {item: foundUser}
    } catch (error) {
        return {
            inserted: false,
            error: error.message
        }
    }
}

const modifyUser = async (req) =>  {
    try {
        const userExists = await listUser(req)

        if (!userExists.item) return "Usuario no encontrado."

        const updatedUser = await UserModel.updateOne(
            {email: req.body.email},
            req.body,
            { new: false }
        );

        if (!updatedUser) return false

        return {item: updatedUser}
    } catch (error) {
        if (error.code === errorCodes.DUPLICATE_KEY_ERROR) return {
            inserted: false,
            error: "Se ha intentado insertar un email duplicado."
        }

        return {
            inserted: false,
            error: error.message
        }
    }
}

const deleteUser = async (req) => {
    try {
        const userExists = await listUser(req)

        if (!userExists.item) return "Usuario no encontrado."

        const deletedUser = await UserModel.deleteOne(
            {email: req.body.email},
            req.body,
            { new: false }
        );

        if (!deletedUser) return false;

        return {deleted: deletedUser.acknowledged};
    } catch (error) {
        if (error.code === errorCodes.DUPLICATE_KEY_ERROR) return {
            inserted: false,
            error: "Se ha intentado insertar un email duplicado."
        }

        return {
            inserted: false,
            error: error.message
        }
    }
}

const getRanking = async (req) => {
    try {
        const rows = await UserModel
            .find({realizedTasks: {$gt: 0}})
            .sort({realizedTask: -1})

        if (!rows) return false

        return {item: rows}
    } catch (error) {
        // if (error.code === errorCodes.DUPLICATE_KEY_ERROR) return {
        //     inserted: false,
        //     error: "Se ha intentado insertar un email duplicado."
        // }

        return {
            inserted: false,
            error: error.message
        }
    }
};

const getUserRoles = async (req) => {
    try {
        const rows = await UserModel
            .find({email: req.body.email})

        if (!rows) return false

        return {item: rows}
    } catch (error) {
        // if (error.code === errorCodes.DUPLICATE_KEY_ERROR) return {
        //     inserted: false,
        //     error: "Se ha intentado insertar un email duplicado."
        // }

        return {
            inserted: false,
            error: error.message
        }
    }
};

module.exports = {
    createUser,
    listUser,
    deleteUser,
    modifyUser,
    getRanking
}