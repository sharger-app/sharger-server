const mongoose = require('mongoose');

const chargerSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    speed: { // Rapid, fast, slow
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
    availability:{
        type: mongoose.Schema.Types.ObjectId
    }
})

module.exports = mongoose.model('user', chargerSchema);