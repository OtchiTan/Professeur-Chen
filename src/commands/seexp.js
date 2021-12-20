const { SlashCommandBuilder } = require('@discordjs/builders')
const FunctionLibrary = require('../structures/FunctionLibrary')
const { LevelModel } = require('../models/LevelModel')
const {MessageEmbed} = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
            .setName(`seexp`)
            .setDescription(`Permet de consulter la progression de l'utilisateur`),

    async exec(message) {
        const args = message.content.split(' ')
        if (args[1] == null) {
            LevelModel.findOne({uid:message.author.id}, (err, docs) => {
                if (err) throw err
                const xpMax = 5 * (Math.pow(docs.level+1,2)) + (50 * docs.level+1) + 100
                var embed = null
                var rank = 0
                
                LevelModel.find({}).sort({totalXp:'desc'}).exec((err, users) => {
                    if (err) throw err
                    for (var i = 0; i < users.length; i++) {
                        if (users[i].uid === docs.uid) rank = i+1
                    }
                    var progressBar = ""

                    const percent = Math.round((docs.xp / xpMax) * 15)

                    for (var i = 0; i <= 15; i++) {
                        if (i <= percent) {
                            progressBar += "="
                        } else {
                            progressBar += "-"
                        }
                    }
                    
                    const author = message.author

                    embed = new MessageEmbed()
                        .setTitle(`${docs.xp} / ${xpMax} xp    |    #${rank}`)
                        .setColor('#47f5ee')
                        .setDescription(`${progressBar} | Niveau ${docs.level}`)
                        .setThumbnail(author.avatarURL())
                        .setAuthor(
                            author.username, 
                            `https://i.pinimg.com/originals/f7/b4/1b/f7b41b0b170d8765d7f6684497c7763a.png`
                        )
                    
                    return message.channel.send({embeds: [embed]})
                })
            })
        } else {
            const userId = args[1].replace(/\D/g,'')
            LevelModel.findOne({uid:userId}, (err, docs) => {
                if (err) throw err
                const xpMax = 5 * (Math.pow(docs.level+1,2)) + (50 * docs.level+1) + 100
                var embed = null
                var rank = 0
                
                LevelModel.find({}).sort({totalXp:'desc'}).exec((err, users) => {
                    if (err) throw err
                    for (var i = 0; i < users.length; i++) {
                        if (users[i].uid === docs.uid) rank = i+1
                    }
                    var progressBar = ""

                    const percent = Math.round((docs.xp / xpMax) * 15)

                    for (var i = 0; i <= 15; i++) {
                        if (i <= percent) {
                            progressBar += "="
                        } else {
                            progressBar += "-"
                        }
                    }
                    
                    const author = message.guild.members.cache.get(userId).user

                    embed = new MessageEmbed()
                        .setTitle(`${docs.xp} / ${xpMax} xp    |    #${rank}`)
                        .setColor('#47f5ee')
                        .setDescription(`${progressBar} | Niveau ${docs.level}`)
                        .setThumbnail(author.avatarURL())
                        .setAuthor(
                            author.username, 
                            `https://i.pinimg.com/originals/f7/b4/1b/f7b41b0b170d8765d7f6684497c7763a.png`
                        )
                    
                    return message.channel.send({embeds: [embed]})
                })
            })
        }
    }
}