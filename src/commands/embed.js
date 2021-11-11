const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');

class Embed extends Command {
    constructor() {
        super('embed', {
           aliases: ['embed'] 
        });
    }

    exec(message) {
        let embed = new MessageEmbed()
            .setTitle('Titre de l\'embed')
            .setDescription('Description de l\'embed')
            .setColor('PURPLE')
            
        return message.channel.send({ embeds: [ embed ] })
    }
}

module.exports = Embed;