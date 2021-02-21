const mongoose = require('mongoose');

const sessSchema = new mongoose.Schema({
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
    booker:{
        type: mongoose.Schema.Types.ObjectId,
    }
})


module.exports = mongoose.model('session', sessSchema);