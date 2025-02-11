const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    profileImg: {
        type: String,
        default: 'https://as2.ftcdn.net/v2/jpg/05/89/93/27/1000_F_589932782_vQAEAZhHnq1QCGu5ikwrYaQD0Mmurm0N.jpg'
    },
    imageId: { type: String },
    passPhrase: {
        type: String,
    },
    password: {
        type: String,
        required: true
    },
    verified: {
        type: Boolean,
        default: false
    },
}, {
    timestamps: true,
    minimize: false
})

const userModel = mongoose.model('users', userSchema);

module.exports = userModel;