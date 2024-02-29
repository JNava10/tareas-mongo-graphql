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
        const foundTask = await TaskModel.findOne({ name: name });

        if (!foundTask) return false;

        return foundTask
    } catch (error) {
        return {
            inserted: false,
            error: error.message
        }
    }
}

const listFreeTasks = async () =>  {
    try {
        const foundTask = await TaskModel.find(
            { userAssigned: { $exists: false }});

        if (!foundTask) return false;

        return foundTask
    } catch (error) {
        return {
            inserted: false,
            error: error.message
        }
    }
}

const listAssignedTasks = async () =>  {
    try {
        const foundTask = await TaskModel.find(
            { userAssigned: { $exists: true }});

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
        const taskExist = await listTask(name);

        if (!taskExist) return "Usuario no encontrado.";

        await TaskModel.updateOne(
            {name: name},
            task,
            { new: false }
        );

        return true
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

        if (!task) return false;
        else if (!user) return false;

        if (task.user) return false;

        const updatedTask = await TaskModel.updateOne(
            {name: taskName},
            {userAssigned: userEmail},
            { new: false }
        );

        if (!updatedTask) return false;

        return updatedTask.modifiedCount > 0
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

        if (!task) return false;

        await TaskModel.updateOne(
            {name: taskName},
            {realizedPercentage: progress},
            { new: false }
        );

        return true;
    } catch (error) {
        return {
            executed: false,
            error: error.message
        }
    }
}

const pendingTasks = async (email) =>  {
    try {
        const user = await UserModel.TaskModel({email: email});

        if (!user) return "Usuario no encontrado.";

        return await TaskModel.find({
            userAssigned: req.body.email,
            ended: false
        })
    } catch (error) {
        return {
            executed: false,
            error: error.message
        }
    }
}

const realizedTasks = async (email) =>  {
    try {
        const user = await TaskModel.findOne({email: email});

        if (!user) return "Usuario no encontrado.";

        return await TaskModel.find({
            userAssigned: email,
            ended: true
        })
    } catch (error) {
        return {
            executed: false,
            error: error.message
        }
    }
}

const realizeTask = async (name) =>  {
    try {
        const task = await TaskModel.findOne({name: name});

        if (!task) return false;

        if (task.ended === true) return false;

        // Actualizamos el estado de la tarea.
        const updated = await TaskModel.updateOne(
            {name: name},
            {ended: true},
            { new: false }
        );

        // Contamos esta tarea en la cuenta de tareas realizadas del usuario.
        await UserModel.updateOne(
            {email: email},
            {$inc: { realizedTasks: 1 }},
            { new: false }
        );

        return updated !== null
    } catch (error) {
        return {
            executed: false,
            error: error.message
        }
    }
}

const unassignTask = async (name) =>  {
    try {

        const task = await TaskModel.findOne({name: name});

        console.log(task)

        if (!task) return false;

        if (task.ended === true || task.userAssigned === null) return false

        const updated = await TaskModel.updateOne(
            {name: name},
            {userAssigned: null},
            { new: false }
        );

        return updated !== null
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
    listAssignedTasks,
    listTask,
    assignTask,
    listFreeTasks,
    changeProgress,
    pendingTasks,
    listAllTasks,
    realizedTasks,
    realizeTask,
    unassignTask
}
