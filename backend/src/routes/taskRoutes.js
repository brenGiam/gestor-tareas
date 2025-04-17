const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const validateTask = require('../middlewares/validateTask');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', authMiddleware, taskController.getTasks);
router.post('/', authMiddleware, validateTask, taskController.createTask);
router.put('/:id', authMiddleware, validateTask, taskController.updateTask);
router.delete('/:id', authMiddleware, taskController.deleteTask);


module.exports = router;