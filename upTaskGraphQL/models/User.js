const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true // Quita espacios en blanco al inicio o al final
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    registry: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('User', UserSchema)