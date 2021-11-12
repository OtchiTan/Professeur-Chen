const mongoose = require('mongoose')

const LevelModel = mongoose.model(
    "professeur-chen",
    {
        uid: {
            type: String,
            required : true
        },       
        level: {
            type: Number,
            required : true
        },
        xp: {
            type: Number,
            required : true
        },
        lastMessage: {
            type: Number,
            required : true
        }
    },
    "level"
)

module.exports = { LevelModel }