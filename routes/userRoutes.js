const middleware = require('../middlewares/middleware');
const {Router } = require('express');
const {UserController} = require("../controllers/userController");
const {TaskController} = require("../controllers/taskController");
const {check} = require("express-validator");
const {validateFields} = require("../middlewares/validateFields");
const {validateToken} = require("../middlewares/validateToken");
const {checkAdminRole, checkDeveloperRole} = require("../middlewares/checkRoles");
const AuthController = require("../controllers/authController");
const router = Router();

router.post('/user',
    [
        check('email', 'El email es obligatorio.').not().isEmpty(),
        check('email', 'El formato del email es incorrecto.').isEmail(),
        check('password', 'La contraseña no tiene una longitud correcta.').isLength({max: 15, min: 1}),
        check('password', 'La contraseña es obligatoria.').not().isEmpty(),
        check('name', 'El nombre es obligatorio.').not().isEmpty(),
        check('name', 'El nombre es obligatorio.').isString(),
        validateFields,
        checkAdminRole
    ],
    UserController.save);

router.post('/user', UserController.find);

router.put('/user', [
    check('email', 'El email es obligatorio.').not().isEmpty(),
    check('email', 'El formato del email es incorrecto.').isEmail(),
    check('password', 'La contraseña no tiene una longitud correcta.').isLength({max: 15, min: 1}),
    check('password', 'La contraseña es obligatoria.').not().isEmpty(),
    check('name', 'El nombre es obligatorio.').not().isEmpty(),
    check('name', 'El nombre es obligatorio.').isString(),
    validateToken,
    checkAdminRole
], UserController.modify);

router.delete('/user', [
    check('email', 'El email es obligatorio.').not().isEmpty(),
    check('email', 'El email es obligatorio.').isEmail(),
    validateToken,
    checkAdminRole
], UserController.delete);

router.post('/user/ranking',  UserController.getRanking);

router.post('/user/login',  AuthController.login);

module.exports = router;
