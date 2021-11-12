const { Command } = require('discord-akairo');

class birthday extends Command {
    constructor() {
        super('birthday', {
           aliases: ['birthday']
        });
    }

    exec(message) {
        return message.reply('Sah, quel aide');
    }
}

module.exports = birthday;