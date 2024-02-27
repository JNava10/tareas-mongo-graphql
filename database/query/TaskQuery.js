const Task = require('../../models/task');
const {uniqueDuplicatedCode} = require("../../helpers/constants");
const UserModel = require("../../models/user");
const errorCodes = require("../../helpers/customErrorCodes");
const TaskModel = require("../../models/task");

const createTask = async (req) =>  {
    try {
        const createdTask = await TaskModel.create(req.body);

        return createdTask;
    } catch (error) {
        if (error.code === errorCodes.DUPLICATE_KEY_ERROR) return "Ese nombre ya existe."

        return error.message;
    }
}

const listTask = async (req) =>  {
    try {
        const rows = await TaskModel.find({name: req.body.name});
        const foundUser = rows[0];

        if (!foundUser) return false

        return {item: foundUser}
    } catch (error) {
        return {
            executed: false,
            error: error.message
        }
    }
}

const modifyTask = async (req) =>  {
    try {
        const userExists = await listTask(req)

        if (!userExists.item) return "Tarea no encontrada."

        const updatedUser = await TaskModel.updateOne(
            {name: req.body.name},
            req.body,
            { new: false }
        );

        if (!updatedUser) return false

        return {item: updatedUser}
    } catch (error) {
        return {
            executed: false,
            error: error.message
        }
    }
}

const deleteTask = async (req) => {
    try {
        const userExists = await listTask(req)

        if (!userExists.item) return "Tarea no encontrada."

        const deletedUser = await TaskModel.deleteOne(
            {name: req.body.name},
            req.body,
            { new: false }
        );

        if (!deletedUser) return false;

        return {deleted: deletedUser.acknowledged};
    } catch (error) {
        return {
            executed: false,
            error: error.message
        }
    }
}

const assignTask = async (req) =>  {
    try {
        const {taskName, userEmail} = req.body;
        const task = await TaskModel.findOne({name: req.body.taskName});
        const user = await UserModel.findOne({email: req.body.userEmail});

        if (!task) return "Tarea no encontrada.";
        else if (!user) return "Usuario no encontrado.";

        if (task.user !== null) return "Tarea ya asignada."

        const updatedTask = await TaskModel.updateOne(
            {name: taskName},
            {userAssigned: userEmail},
            { new: false }
        );

        if (!updatedTask) return false

        return {item: updatedTask}
    } catch (error) {
        return {
            executed: false,
            error: error.message
        }
    }
}

const changeProgress = async (req) =>  {
    try {
        const {progress, taskName} = req.body;
        const task = await TaskModel.findOne({name: taskName});

        console.log(progress);

        if (!task) return "Tarea no encontrada.";

        const updatedTask = await TaskModel.updateOne(
            {name: taskName},
            {realizedPercentage: progress},
            { new: false }
        );

        if (!updatedTask) return false;

        return {item: updatedTask}
    } catch (error) {
        return {
            executed: false,
            error: error.message
        }
    }
}

const pendingTasks = async (req) =>  {
    try {
        const user = await UserModel.findOne({email: req.body.email});

        if (!user) return "Usuario no encontrado.";

        const rows = await TaskModel.find({
            userAssigned: req.body.email,
            ended: false
        }).count();

        return {item: rows}
    } catch (error) {
        return {
            executed: false,
            error: error.message
        }
    }
}


module.exports = {
    createTask,
    modifyTask,
    deleteTask,
    listTask,
    assignTask,
    changeProgress,
    pendingTasks
}
