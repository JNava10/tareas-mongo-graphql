const {Router} = require('express');
const router = Router();
const { TaskController } = require('../controllers/taskController');
const middleware = require('../middlewares/middleware');
const {body} = require("express-validator");
const {UserController} = require("../controllers/userController");
const {AuthController} = require("../controllers/authController");
const userValidation = require("../middlewares/validations/userValidation");

module.exports = router;