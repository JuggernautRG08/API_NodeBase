const express = require('express');
const UserRepository = require('../database/UserRepository');
const UserUseCase = require('../../domain/usecases/UserUseCase');
const UserController = require('../../application/controllers/UserController');

const router = express.Router();
const userRepository = new UserRepository();
const userUseCase = new UserUseCase(userRepository);
const userController = new UserController(userUseCase);

router.post('/users', (req, res) => userController.createUser(req, res));
router.get('/users', (req, res) => userController.getAllUsers(req, res));
router.get('/users/:id', (req, res) => userController.getUserById(req, res));
router.put('/users/:id', (req, res) => userController.updateUser(req, res));
router.delete('/users/:id', (req, res) => userController.deleteUser(req, res));

module.exports = router;
