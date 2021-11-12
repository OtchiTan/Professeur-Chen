const { Command } = require('discord-akairo');

class nextbirthday extends Command {
    constructor() {
        super('nextbirthday', {
           aliases: ['nextbirthday']
        });
    }

    exec(message) {
        return message.reply('Sah, quel aide');
    }
}

module.exports = nextbirthday;