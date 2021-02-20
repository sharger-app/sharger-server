const mongoose = require('mongoose');

const histSchema = new mongoose.Schema({
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
        required: true,
    }
})


module.exports = mongoose.model('history', histSchema);