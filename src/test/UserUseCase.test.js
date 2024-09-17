const UserUseCase = require('../src/domain/usecases/UserUseCase');

describe('User UseCase', () => {
    let userUseCase;
    let mockUserRepository;

    beforeEach(() => {
        // Crear un mock del repositorio
        mockUserRepository = {
            create: jest.fn(),
            findAll: jest.fn(),
            findById: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
        };

        // Crear una instancia del caso de uso con el mock del repositorio
        userUseCase = new UserUseCase(mockUserRepository);
    });

    it('should create a user', async () => {
        const user = { name: 'John Doe', email: 'john@example.com', role: 'admin' };
        mockUserRepository.create.mockResolvedValue(user);

        const result = await userUseCase.createUser(user);

        expect(mockUserRepository.create).toHaveBeenCalledWith(user);
        expect(result).toEqual(user);
    });

    it('should return all users', async () => {
        const users = [{ name: 'John Doe', email: 'john@example.com' }];
        mockUserRepository.findAll.mockResolvedValue(users);

        const result = await userUseCase.getAllUsers();

        expect(mockUserRepository.findAll).toHaveBeenCalled();
        expect(result).toEqual(users);
    });

    it('should return a user by ID', async () => {
        const user = { name: 'John Doe', email: 'john@example.com' };
        mockUserRepository.findById.mockResolvedValue(user);

        const result = await userUseCase.getUserById('123');

        expect(mockUserRepository.findById).toHaveBeenCalledWith('123');
        expect(result).toEqual(user);
    });

    it('should update a user', async () => {
        const updatedUser = { name: 'John Doe Updated', email: 'john.updated@example.com' };
        mockUserRepository.update.mockResolvedValue(updatedUser);

        const result = await userUseCase.updateUser('123', updatedUser);

        expect(mockUserRepository.update).toHaveBeenCalledWith('123', updatedUser);
        expect(result).toEqual(updatedUser);
    });

    it('should delete a user', async () => {
        mockUserRepository.delete.mockResolvedValue(true);

        const result = await userUseCase.deleteUser('123');

        expect(mockUserRepository.delete).toHaveBeenCalledWith('123');
        expect(result).toBeTruthy();
    });
});
