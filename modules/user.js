const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    user: String,
    pass: String,
    pfp: String,
    credit: String,
    sus: String
})

module.exports = mongoose.model('User', UserSchema)