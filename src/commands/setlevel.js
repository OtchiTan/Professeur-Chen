const { SlashCommandBuilder } = require('@discordjs/builders')
const FunctionLibrary = require('../structures/FunctionLibrary')
const User = require('../structures/User')
const { LevelModel } = require('../models/LevelModel')

module.exports = {
    data: new SlashCommandBuilder()
            .setName(`setlevel`)
            .setDescription(`Défini le nouveau niveau d'un joueur`),

    async exec(message) {
        const args = message.content.split(' ')
        if (FunctionLibrary.hasAuthority(message)) {
            if (args[1] == null) return message.reply(`Veuillez précisez l'utilisateur`)
            if (args[2] == null) return message.reply(`Veuillez précisez le niveau à définir`)
            
            const userId = args[1].replace(/\D/g,'')
            const userPing = message.guild.members.cache.get(userId)
            const newLevel = args[2]

            LevelModel.findOne({uid:userId}, (err, docs) => {
                if (err) throw err
                if (docs === null) return message.reply(`L'utilisateur n'existe pas en base de donnée`)
                const user = new User({uid:docs.uid,
                    totalXp:docs.totalXp,
                    xp:docs.xp,
                    lastMessage:docs.lastMessage,
                    level:docs.level,
                    guild:message.guild})
                
                user.setLevel(newLevel)

                return message.reply(`**${userPing}** est maintenant niveau **${newLevel}**`)
            })
        } else {
            return message.reply("Il te faut les droits d'administration pour pouvoir exécuter cette commande")
        }
    }
}