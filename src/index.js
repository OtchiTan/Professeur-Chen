const ChenClient = require('./structures/ChenClient')
require('dotenv').config()

const client = new ChenClient({
    prefix:':'
})

client.login(process.env.TOKEN)