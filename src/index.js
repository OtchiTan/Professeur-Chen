const ChenClient = require('./structures/ChenClient')
const env = require('./utils/env')
const config = require('./utils/config')

const client = new ChenClient({
    prefix:config.prefix
})

client.login(env.token)