const { SlashCommandBuilder } = require('@discordjs/builders')
const User = require('../structures/User')
const FunctionLibrary = require('../structures/FunctionLibrary')
const { LevelModel } = require('../models/LevelModel')

module.exports = {
    data: new SlashCommandBuilder()
            .setName(`removexp`)
            .setDescription(`Retire de l'xp à un utilisateur`),

    async exec(message) {
        const args = message.content.split(' ')
        if (FunctionLibrary.hasAuthority(message)) {
            if (args[1] == null) return message.reply(`Veuillez précisez l'utilisateur`)
            if (args[2] == null) return message.reply(`Veuillez précisez l'xp à ajouter`)
            
            const userId = args[1].replace(/\D/g,'')
            const userPing = message.guild.members.cache.get(userId)
            const xpToAdd = args[2]

            LevelModel.findOne({uid:userId}, (err, docs) => {
                if (err) throw err
                if (docs === null) return message.reply(`L'utilisateur n'existe pas en base de donnée`)
                const user = new User({uid:docs.uid,
                    totalXp:docs.totalXp,
                    actualXp:docs.actualXp,
                    lastMessage:docs.lastMessage,
                    level:docs.level,
                    guild:message.guild})

                user.xpGain(parseInt(xpToAdd / -1))
                const newTotalXp = docs.totalXp - parseInt(xpToAdd)

                return message.reply(`**${userPing}** à perdu **${xpToAdd}** points d'xp. Iel est maintenant à **${newTotalXp}** points d'xp`)
            })
        } else {
            return message.reply("Il te faut les droits d'administration pour pouvoir exécuter cette commande")
        }
    }
}