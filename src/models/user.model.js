const mongoose = require('mongoose');

const UserSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please, enter an username'],
        },
        email: {
            type: String,
            required: [true, 'Please, enter an user email'],
            unique: true
        },
        password: {
            type: String,
            required: [true, 'Please enter an password']
        }
    },
    {
        timestamps: true
    }
)

const User = mongoose.model('User', UserSchema);

module.exports = User;