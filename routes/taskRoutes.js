const { TaskController } = require('../controllers/taskController');
const middleware = require('../middlewares/middleware');
const {Router } = require('express');
const router = Router();

// CRUD
router.post('/task',  TaskController.save);
router.get('/task',  TaskController.find);
router.put('/task',  TaskController.modify);
router.delete('/task',  TaskController.delete);

// Asignar tareas
router.put('/task/assign/',  TaskController.assign);
router.put('/task/progress/',  TaskController.changeProgress);

// app.get('/task/:id',  TaskController.find);

module.exports = router;
