const TaskQuery = require("../database/query/TaskQuery");
const {task} = require("../helpers/collectionNames");

class TaskController {
    static find = async (name) => {
        try {
            return await TaskQuery.listAssignedTasks(name);
        } catch (error) {
            return false
        }
    };

    static findAssigned = async () => {
        try {
            return await TaskQuery.listAssignedTasks();
        } catch (error) {
            return false
        }
    };

    static findFree = async () => {
        try {
            return await TaskQuery.listFreeTasks();
        } catch (error) {
            return false
        }
    };

    static findAll = async () => {
        try {
            return await TaskQuery.listAllTasks();
        } catch (error) {
            return false
        }
    };


    static save = async (task) => {
        try {
            return await TaskQuery.createTask(task);
        } catch (error) {
            return error;
        }
    };

    static modify = async (name, task) => {
        try {
            return await TaskQuery.modifyTask(name, task)
        } catch (error) {
            console.log(error);
            return false
        }
    };

    static delete = async (name) => {
        try {
            return await TaskQuery.deleteTask(name)
        } catch (error) {
            return false
        }
    };

    static assign = async (taskName, userEmail) => {
        try {
            return await TaskQuery.assignTask(taskName, userEmail)
        } catch (error) {
            return false
        }
    };

    static changeProgress = async (progress, taskName) => {
        try {
            return await TaskQuery.changeProgress(progress, taskName);
        } catch (error) {
            return false
        }
    };

    static getPendingTasks = async (email) => {
        try {
            return await TaskQuery.pendingTasks(email);
        } catch (error) {
            return false;
        }
    };

    static getRealizedTasks = async (email) => {
        try {
            return await TaskQuery.realizedTasks(email)
        } catch (error) {
            return false;
        }
    };
}

module.exports = {
    TaskController
};