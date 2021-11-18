const { Command } = require('discord-akairo');
const { LevelModel } = require('../../models/LevelModel');
const config = require('../../utils/config')

class SetLevel extends Command {
    constructor() {
        super('setlevel', {
           aliases: ['setlevel'],
           args: [
               {id:'userToSet', type:'user'},
               {id:'newLevel', type:'number'}
           ]
        });
    }

    exec(message, args) {
        var badChannel = true
        for (var channelBan of config.commandChannel) {
            if (badChannel && message.channel.id === channelBan) badChannel = false
        }
        if (badChannel) return
        if (this.hasAuthority(message)) {
            const xpByLevel = 5 * (Math.pow(args.newLevel,2)) + (50 * args.newLevel) + 100
            LevelModel.findOneAndUpdate({uid:args.userToSet.id},{level:args.newLevel,xp:0,totalXp:xpByLevel}, (err) => {
                if (err) throw err

                return message.reply(`**${args.userToSet.username}** est maintenant niveau ${args.newLevel}`)
            })
        } else {
            return message.reply("Il te faut les droits d'administration pour pouvoir exécuter cette commande")
        }
    }

    hasAuthority(message){
        var hasAuthority = false
        for (var roleId of config.adminRoles) {
            if (message.member.roles.cache.some(r => r.id === roleId)) hasAuthority = true
        }
        return hasAuthority
    }
}

module.exports = SetLevel;