const { SlashCommandBuilder } = require('@discordjs/builders')
const FunctionLibrary = require('../structures/FunctionLibrary')
const { LevelModel } = require('../models/LevelModel')
const {MessageEmbed} = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
            .setName(`topxp`)
            .setDescription(`Affiche les 10 personne les plus active du serveur`),

    async exec(message) {
        
        LevelModel.find({}).sort({totalXp:'desc'}).exec((err, docs) => {
            if (err) throw err
            const userId = message.author.id

            for (var i = 0; i < docs.length; i++) {
                if (docs[i].uid === userId) rank = i+1
            }

            var fields = []
            for (var i = 0; i < 10; i++) {
                if (typeof docs[i] !== 'undefined') {
                    fields.push({
                        name:`${docs[i].username} | ${docs[i].totalXp} xp total`,
                        value:`#${i+1}`,
                        inline:false})
                }
            }
            var senderData = docs.find(user => user.uid === message.author.id)
            var user = message.author.username

            let embed = new MessageEmbed()
                .setTitle(`__${user}__, vous êtes numéro #${rank}, avec un total de ${senderData.totalXp} xp`)
                .setDescription('Voici le classement des 10 personnes les plus actives')
                .setColor('#47f5ee')
                .setFields(fields)
                .setThumbnail('https://i.pinimg.com/originals/f7/b4/1b/f7b41b0b170d8765d7f6684497c7763a.png')
                .setAuthor(
                    'Professeur Chen', 
                    'https://cdn.discordapp.com/avatars/908349301732802580/6a2f4968c29b2470e21c6b85328056f5.png?size=256'
                )

            return message.channel.send({embeds: [embed]})
        })
    }
}/*
class TopXp extends Command {
    constructor() {
        super('topxp', {
           aliases: ['topxp']
        });
    }

    exec(message) {
        var badChannel = true
        for (var channelBan of config.commandChannel) {
            if (badChannel && message.channel.id === channelBan) badChannel = false
        }
        if (badChannel) return
        LevelModel.find({}).sort({totalXp:'desc'}).exec((err, docs) => {
            if (err) throw err

            var fields = []
            
            for (var i = 0; i < 10; i++) {
                if (typeof docs[i] !== 'undefined') {
                    var user = message.guild.members.cache.get(docs[i].uid).user.username
                    fields.push({
                        name:`${user} | ${docs[i].totalXp} xp total`,
                        value:`#${docs[i].rank}`,
                        inline:false
                    })
                }
            }

            var senderData = docs.find(user => user.uid === message.author.id)
            var user = message.author.username

            let embed = new MessageEmbed()
                .setTitle(`__${user}__, vous êtes numéro #${senderData.rank}, avec un total de ${senderData.totalXp} xp`)
                .setDescription('Voici le classement des 10 personnes les plus actives')
                .setColor('#47f5ee')
                .setFields(fields)
                .setThumbnail('https://i.pinimg.com/originals/f7/b4/1b/f7b41b0b170d8765d7f6684497c7763a.png')
                .setAuthor(
                    'Professeur Chen', 
                    'https://cdn.discordapp.com/avatars/908349301732802580/6a2f4968c29b2470e21c6b85328056f5.png?size=256'
                )

            return message.channel.send({embeds: [embed]})
        })
    }
}

module.exports = TopXp;*/