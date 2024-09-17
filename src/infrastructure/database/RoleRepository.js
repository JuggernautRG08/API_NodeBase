const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
    name: String,
});

const RoleModel = mongoose.model('Role', roleSchema);

class RoleRepository {
    async create(role) {
        return await RoleModel.create(role);
    }

    async findAll() {
        return await RoleModel.find();
    }

    async findById(id) {
        return await RoleModel.findById(id);
    }

    async update(id, role) {
        return await RoleModel.findByIdAndUpdate(id, role, { new: true });
    }

    async delete(id) {
        return await RoleModel.findByIdAndDelete(id);
    }
}

module.exports = RoleRepository;
