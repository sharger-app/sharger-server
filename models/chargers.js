const mongoose = require('mongoose');

const chargerSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    name: {
        type: String,
        requried: true
    },
    speed: { // Rapid, fast, slow
        type: String,
        required: true
    },
    plug: {
        type: String,
        required: true
    },
    wattage: { // In kW
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    sessions: {
        type: mongoose.Schema.Types.ObjectId
    },
    housing: {
        type: Boolean,
        required: true
    },
    review: {
        type: mongoose.Schema.Types.ObjectId
    },
    image: {
        type: String
    },
    price: { //dollar per min
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('charger', chargerSchema);