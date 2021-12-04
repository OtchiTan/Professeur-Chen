const { SlashCommandBuilder } = require('@discordjs/builders')
const FunctionLibrary = require('../structures/FunctionLibrary')
const { LevelModel } = require('../models/LevelModel')

module.exports = {
    data: new SlashCommandBuilder()
            .setName(`removeuser`)
            .setDescription(`Supprime un utilisateur de la base de donnée`),

    async exec(message) {
        const args = message.content.split(' ')
        if (FunctionLibrary.hasAuthority(message)) {
            if (args[1] == null) return message.reply(`Veuillez précisez l'utilisateur`)
            const userId = args[1].replace(/\D/g,'')
            LevelModel.findOneAndRemove({uid:userId}, (err, docs) => {
                if (err) throw err
                if (docs !== null) return message.reply('L\'utilisateur à bien été retirer de la base de donnée')
                else return message.reply('L\'utilisateur n\'existe pas en base de donnée')
            })
        } else {
            return message.reply("Il te faut les droits d'administration pour pouvoir exécuter cette commande")            
        }
    }
}