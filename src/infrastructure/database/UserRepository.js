const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    role: { type: mongoose.Schema.Types.ObjectId, ref: 'Role' }
});

const UserModel = mongoose.model('User', userSchema);

class UserRepository {
    async create(user) {
        return await UserModel.create(user);
    }

    async findAll() {
        return await UserModel.find().populate('role');
    }

    async findById(id) {
        return await UserModel.findById(id).populate('role');
    }

    async update(id, user) {
        return await UserModel.findByIdAndUpdate(id, user, { new: true });
    }

    async delete(id) {
        return await UserModel.findByIdAndDelete(id);
    }
}

module.exports = UserRepository;
