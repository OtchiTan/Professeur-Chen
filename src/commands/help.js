const { Command } = require('discord-akairo');

class Help extends Command {
    constructor() {
        super('help', {
           aliases: ['help'] 
        });
    }

    exec(message) {
        return message.reply('Sah, quel aide');
    }
}

module.exports = Help;