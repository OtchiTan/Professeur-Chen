const mongoose = require('mongoose')
const env = require('./env.js')

mongoose.connect(
    `mongodb+srv://${env.dbLogin}:${env.dbPassword}@${env.dbAdress}/professeur-chen`,
    { useNewUrlParser: true, useUnifiedTopology: true},
    (err) => {
        if (!err) 
            console.log('MongoDB Connected')
        else 
            console.log("Connection error : " + err)
    }
)