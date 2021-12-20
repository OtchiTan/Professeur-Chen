const mongoose = require('mongoose')

const LevelModel = mongoose.model(
    "level",
    {
        uid: {
            type: String,
            required : true
        },       
        level: {
            type: Number,
            required : true
        },
        lastMessage: {
            type: Number,
            required : true
        },
        totalXp: {
            type: Number,
            require:true
        },
        xp: {
            type: Number,
            require:true
        },
        username: {
            type: String,
            required : true
        }
    },
    "level"
)

module.exports = { LevelModel }