const mongoose = require('mongoose')

const InfoSchema = new mongoose.Schema({
    version: String,
    wip: String,
    LN: String,
    DN: String
})


module.exports = mongoose.model("Info", InfoSchema)