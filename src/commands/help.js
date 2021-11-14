const { Command } = require('discord-akairo');
const config = require('../utils/config')

class Help extends Command {
    constructor() {
        super('help', {
           aliases: ['help'] 
        });
    }

    exec(message) {
        if (message.channel.id != config.commandChannel) return
        return message.reply('Sah, quel aide');
    }
}

module.exports = Help;