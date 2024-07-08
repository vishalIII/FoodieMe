const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    CategoryName: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

const Item = mongoose.model('sample', ItemSchema);

module.exports = Item;
