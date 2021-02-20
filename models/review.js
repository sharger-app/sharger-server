const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    charger: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    start:{
        type: Date,
        required: true
    },
    end:{
        type: Date,
        required: true
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    renter:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    star: {
        type: Number,
        required: true
    },
    comment:{
        type: String
    }
})

module.exports = mongoose.model('user', reviewSchema);