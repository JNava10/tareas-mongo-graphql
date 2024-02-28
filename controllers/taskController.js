const {response, request} = require('express');
const {Common} = require("../helpers/common");
const TaskQuery = require("../database/query/TaskQuery");
const UserQuery = require("../database/query/UserQuery");

class TaskController {
    static find = async (name) => {
        try {
            return await TaskQuery.listTask(name);
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
            const insertedItem = await TaskQuery.createTask(req);

            return res.status(200).json(insertedItem);
        } catch (error) {
            return res.status(500).json(error.message);
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
            return res.status(500).json({error: error.message})
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