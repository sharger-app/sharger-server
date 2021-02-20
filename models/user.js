const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    address: String,
    phone: String,
    charger: [mongoose.Schema.Types.ObjectId],
    rental_history: [mongoose.Schema.Types.ObjectId],
    rented_history: [mongoose.Schema.Types.ObjectId],
    car_attribute: String,
    user_rating: [Number]
})

module.exports = mongoose.model('user', userSchema);