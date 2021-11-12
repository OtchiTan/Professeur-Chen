const { Command } = require('discord-akairo');

class addbirthday extends Command {
    constructor() {
        super('addbirthday', {
           aliases: ['addbirthday']
        });
    }

    exec(message) {
        return message.reply('Sah, quel aide');
    }
}

module.exports = addbirthday;