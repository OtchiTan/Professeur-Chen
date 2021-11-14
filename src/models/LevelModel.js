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
        xp: {
            type: Number,
            required : true
        },
        lastMessage: {
            type: Number,
            required : true
        },
        rank : {
            type: Number,
            require: true
        },
        totalXp: {
            type: Number,
            require:true
        }
    },
    "level"
)

module.exports = { LevelModel }