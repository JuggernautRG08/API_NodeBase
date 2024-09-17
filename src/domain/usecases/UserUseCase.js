class UserUseCase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async createUser(user) {
        return await this.userRepository.create(user);
    }

    async getAllUsers() {
        return await this.userRepository.findAll();
    }

    async getUserById(id) {
        return await this.userRepository.findById(id);
    }

    async updateUser(id, user) {
        return await this.userRepository.update(id, user);
    }

    async deleteUser(id) {
        return await this.userRepository.delete(id);
    }
}

module.exports = UserUseCase;
