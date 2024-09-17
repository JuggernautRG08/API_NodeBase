class UserController {
    constructor(userUseCase) {
        this.userUseCase = userUseCase;
    }

    async createUser(req, res) {
        try {
            const user = await this.userUseCase.createUser(req.body);
            res.status(201).json(user);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async getAllUsers(req, res) {
        try {
            const users = await this.userUseCase.getAllUsers();
            res.json(users);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async getUserById(req, res) {
        try {
            const user = await this.userUseCase.getUserById(req.params.id);
            res.json(user);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async updateUser(req, res) {
        try {
            const user = await this.userUseCase.updateUser(req.params.id, req.body);
            res.json(user);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async deleteUser(req, res) {
        try {
            await this.userUseCase.deleteUser(req.params.id);
            res.status(204).end();
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = UserController;
