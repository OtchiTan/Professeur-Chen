const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const { LevelModel } = require('../../models/LevelModel');
const config = require('../../utils/config')

class RemoveUser extends Command {
    constructor() {
        super('removeuser', {
           aliases: ['removeuser'],
           args:[
               {id:'uid', type:'string', default:null}
           ]
        });
    }

    exec(message, args) {
        if (message.channel.id != config.commandChannel) return
        if (args.uid !== null) {
            LevelModel.findOneAndRemove({uid:args.uid}, (err, docs) => {
                if (err) throw err
                if (docs !== null) return message.reply('L\'utilisateur à bien été retirer de la base de donnée')
                else return message.reply('L\'utilisateur n\'existe pas en base de donnée')
            })
        } else return message.reply('Veuillez préciser l\'id de l\'utilisateur bannis')
    }
}

module.exports = RemoveUser;