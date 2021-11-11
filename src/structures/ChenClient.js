const { AkairoClient, CommandHandler, ListenerHandler } = require('discord-akairo')
const config = require('../../config.json')

module.exports = class ChenClient extends AkairoClient {
    constructor (config = {}) {
        super(
            { ownerID: ["179656990371479552", "696770981259378820"] },
            { 
                allowedMentions: {
                    parse: ["everyone", "roles", "users"],
                    repliedUser: false
                },
                partials: ['CHANNEL', 'GUILD_MEMBER', 'MESSAGE', 'REACTION', 'USER'],
                presence: {
                    status: 'online',
                    activities: [{
                        name:"Test",
                        type:"WATCHING",
                        url:"https://discord.gg/bDnG3rmNEA"
                    }]
                },
                intents: 32767
            }
        )

        this.commandHandler = new CommandHandler(this, {
            allowMention:true,
            prefix: config.prefix,
            defaultCooldown:2000,
            directory: './commands/'
        })

        this.listenerHandler = new ListenerHandler(this, {
            directory: './listeners/'
        })

        this.commandHandler.useListenerHandler(this.listenerHandler)
        this.listenerHandler.loadAll()
        this.commandHandler.loadAll()
    }
}