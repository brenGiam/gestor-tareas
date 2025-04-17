const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const validateUser = require('../middlewares/validateUser');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', authMiddleware, userController.getUsers);
router.post('/', validateUser, userController.createUser);
router.put('/:id', authMiddleware, validateUser, userController.updateUser);
router.delete('/:id', authMiddleware, userController.deleteUser);
router.post('/login', userController.loginUser);


module.exports = router;