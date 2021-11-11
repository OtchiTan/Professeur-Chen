const { Command } = require('discord-akairo');

class Embed extends Command {
    constructor() {
        super('embed', {
           aliases: ['embed'] 
        });
    }

    exec(message) {
        return message.reply('Sah, quel aide');
    }
}

module.exports = Embed;