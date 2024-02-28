const Task = require('../../models/task');
const {uniqueDuplicatedCode} = require("../../helpers/constants");
const UserModel = require("../../models/user");
const errorCodes = require("../../helpers/customErrorCodes");
const TaskModel = require("../../models/task");

const listAllTasks = async () => {
    try {
        const foundTask = await TaskModel.find();

        if (!foundTask) return false;

        return foundTask
    } catch (error) {
        return {
            inserted: false,
            error: error.message
        }
    }
};

const createTask = async (task) =>  {
    try {
        return await TaskModel.create(task);
    } catch (error) {
        if (error.code === errorCodes.DUPLICATE_KEY_ERROR) return "Se ha intentado insertar un email duplicado."

        return error.message
    }
}

const listTask = async (name) =>  {
    try {
        const foundTask = await TaskModel.findOne({name: name});

        if (!foundTask) return false;

        return foundTask
    } catch (error) {
        return {
            inserted: false,
            error: error.message
        }
    }
}

const modifyTask = async (name, task) =>  {
    try {
        const userExists = await listUser(task);

        if (!userExists.item) return "Usuario no encontrado.";

        const updatedUser = await TaskModel.updateOne(
            {name: name},
            task,
            { new: false }
        );

        if (!updatedUser) return false

        return updatedUser
    } catch (error) {
        console.error(error)
        return null
    }
}

const deleteTask = async (name) => {
    try {
        const userExists = await listUser(name)

        if (!userExists) return false;

        const deleted = await TaskModel.deleteOne(
            {name: name},
            {new: false}
        );

        console.log(deleted)

        return deleted.deletedCount > 0
    } catch (error) {
        console.error(error)
        return null
    }
}

const assignTask = async (taskName, userEmail) =>  {
    try {
        const task = await TaskModel.findOne({name: taskName});
        const user = await UserModel.findOne({email: userEmail});

        if (!task) return "Tarea no encontrada.";
        else if (!user) return "Usuario no encontrado.";

        if (task.user !== null) return "Tarea ya asignada."

        const updatedTask = await TaskModel.updateOne(
            {name: taskName},
            {userAssigned: userEmail},
            { new: false }
        );

        if (!updatedTask) return false

        return updatedTask
    } catch (error) {
        return {
            executed: false,
            error: error.message
        }
    }
}

const changeProgress = async (progress, taskName) =>  {
    try {
        const task = await TaskModel.findOne({name: taskName});

        if (!task) return "Tarea no encontrada.";

        const updatedTask = await TaskModel.updateOne(
            {name: taskName},
            {realizedPercentage: progress},
            { new: false }
        );

        if (!updatedTask) return false;

        return updatedTask
    } catch (error) {
        return {
            executed: false,
            error: error.message
        }
    }
}

const pendingTasks = async (email) =>  {
    try {
        const user = await UserModel.findOne({email: email});

        if (!user) return "Usuario no encontrado.";

        const pending = await TaskModel.find({
            userAssigned: req.body.email,
            ended: false
        });

        return {tasks: pending, count: pending.length}
    } catch (error) {
        return {
            executed: false,
            error: error.message
        }
    }
}

const realizedTasks = async (email) =>  {
    try {
        const user = await UserModel.findOne({email: email});

        if (!user) return "Usuario no encontrado.";

        const pending = await TaskModel.find({
            userAssigned: req.body.email,
            ended: false
        });

        return {tasks: pending, count: pending.length}
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
    pendingTasks,
    listAllTasks
}
