const { AkairoClient, CommandHandler, ListenerHandler } = require('discord-akairo')

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
                intents: 32767
            }
        )

        this.commandHandler = new CommandHandler(this, {
            allowMention:true,
            prefix: config.prefix,
            defaultCooldown:config.cooldown,
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