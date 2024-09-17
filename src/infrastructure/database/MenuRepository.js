const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
    title: String,
    url: String,
});

const MenuModel = mongoose.model('Menu', menuSchema);

class MenuRepository {
    async create(menu) {
        return await MenuModel.create(menu);
    }

    async findAll() {
        return await MenuModel.find();
    }

    async findById(id) {
        return await MenuModel.findById(id);
    }

    async update(id, menu) {
        return await MenuModel.findByIdAndUpdate(id, menu, { new: true });
    }

    async delete(id) {
        return await MenuModel.findByIdAndDelete(id);
    }
}

module.exports = MenuRepository;
