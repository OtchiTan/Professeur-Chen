const ChenClient = require('./structures/ChenClient')
const config = require('../config.json')

const client = new ChenClient({
    prefix:'+'
})

client.login(config.token)