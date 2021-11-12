const { Command } = require('discord-akairo');

class removebirthday extends Command {
    constructor() {
        super('removebirthday', {
           aliases: ['removebirthday']
        });
    }

    exec(message) {
        return message.reply('Sah, quel aide');
    }
}

module.exports = removebirthday;