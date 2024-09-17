const request = require('supertest');
const express = require('express');
const UserUseCase = require('../src/domain/usecases/UserUseCase');
const UserController = require('../src/application/controllers/UserController');

describe('User Controller', () => {
    let app;
    let mockUserUseCase;
    let userController;

    beforeEach(() => {
        // Crear un mock del caso de uso
        mockUserUseCase = {
            createUser: jest.fn(),
            getAllUsers: jest.fn(),
            getUserById: jest.fn(),
            updateUser: jest.fn(),
            deleteUser: jest.fn(),
        };

        // Crear la instancia del controlador con el mock del caso de uso
        userController = new UserController(mockUserUseCase);

        // Configurar la aplicación de Express
        app = express();
        app.use(express.json());
        app.post('/users', (req, res) => userController.createUser(req, res));
        app.get('/users', (req, res) => userController.getAllUsers(req, res));
        app.get('/users/:id', (req, res) => userController.getUserById(req, res));
        app.put('/users/:id', (req, res) => userController.updateUser(req, res));
        app.delete('/users/:id', (req, res) => userController.deleteUser(req, res));
    });

    it('should create a user', async () => {
        const user = { name: 'John Doe', email: 'john@example.com' };
        mockUserUseCase.createUser.mockResolvedValue(user);

        const response = await request(app).post('/users').send(user);

        expect(response.status).toBe(201);
        expect(response.body).toEqual(user);
        expect(mockUserUseCase.createUser).toHaveBeenCalledWith(user);
    });

    it('should return all users', async () => {
        const users = [{ name: 'John Doe', email: 'john@example.com' }];
        mockUserUseCase.getAllUsers.mockResolvedValue(users);

        const response = await request(app).get('/users');

        expect(response.status).toBe(200);
        expect(response.body).toEqual(users);
        expect(mockUserUseCase.getAllUsers).toHaveBeenCalled();
    });

    it('should return a user by ID', async () => {
        const user = { name: 'John Doe', email: 'john@example.com' };
        mockUserUseCase.getUserById.mockResolvedValue(user);

        const response = await request(app).get('/users/123');

        expect(response.status).toBe(200);
        expect(response.body).toEqual(user);
        expect(mockUserUseCase.getUserById).toHaveBeenCalledWith('123');
    });

    it('should update a user', async () => {
        const updatedUser = { name: 'John Doe Updated', email: 'john.updated@example.com' };
        mockUserUseCase.updateUser.mockResolvedValue(updatedUser);

        const response = await request(app).put('/users/123').send(updatedUser);

        expect(response.status).toBe(200);
        expect(response.body).toEqual(updatedUser);
        expect(mockUserUseCase.updateUser).toHaveBeenCalledWith('123', updatedUser);
    });

    it('should delete a user', async () => {
        mockUserUseCase.deleteUser.mockResolvedValue(true);

        const response = await request(app).delete('/users/123');

        expect(response.status).toBe(204);
        expect(mockUserUseCase.deleteUser).toHaveBeenCalledWith('123');
    });
});
