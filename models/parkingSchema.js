const mongoose = require('mongoose')

const parkingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    lat: {
        type: String,
        required: true
    },
    long: {
        type: String,
        required: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    },
    user_name: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Parking", parkingSchema)