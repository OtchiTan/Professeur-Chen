const { Command } = require('discord-akairo');
const { LevelModel } = require('../../models/LevelModel');
const config = require('../../utils/config')

class AddXp extends Command {
    constructor() {
        super('addxp', {
           aliases: ['addxp'],
           args: [
               {id:'userToAdd', type:'user'},
               {id:'xpToAdd', type:'number'}
           ]
        });
    }

    exec(message, args) {
        if (message.channel.id != config.commandChannel) return
        if (this.hasAuthority(message)) {
            if (args.userToAdd == null) return message.reply(`Veuillez précisez le joueur`)
            if (args.xpToAdd == null) return message.reply(`Veuillez précisez l'xp à ajouter`)

            LevelModel.findOne({uid:args.userToAdd.id}, (err, docs) => {
                if (err) throw err
                const newXp = docs.xp + args.xpToAdd
                const newTotalXp = docs.totalXp + args.xpToAdd
                LevelModel.updateOne({uid:args.userToAdd.id},{xp:newXp,totalXp:newTotalXp}, (err) => {
                    if (err) throw err
                    return message.reply(`**${args.userToAdd.username}** à gagner **${args.xpToAdd}** points d'xp. Il est maintenant à **${newXp}** points d'xp`)
                })
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

module.exports = AddXp;