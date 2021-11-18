const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const { LevelModel } = require('../../models/LevelModel');
const config = require('../../utils/config')

class SeeXp extends Command {
    constructor() {
        super('seexp', {
           aliases: ['seexp'],
           args: [
               {id:'userToSee', type:'user', default:null}
           ]
        });
    }

    exec(message, args) {
        var badChannel = true
        for (var channelBan of config.commandChannel) {
            if (badChannel && message.channel.id === channelBan) badChannel = false
        }
        if (badChannel) return

        if (args.userToSee !== null) {
            LevelModel.findOne({uid:args.userToSee.id}, (err, docs) => {
                if (err) throw err
                const embed = this.showXp(docs, message)
                return message.channel.send({embeds: [embed]})
            })            
        } else {
            LevelModel.findOne({uid:message.author.id}, (err, docs) => {
                if (err) throw err
                const embed = this.showXp(docs, message)
                return message.channel.send({embeds: [embed]})
            })
        }        
    }

        showXp(docs, message) {
            const xpMax = 5 * (Math.pow(docs.level+1,2)) + (50 * docs.level+1) + 100

            var progressBar = ""
            const percent = Math.round((docs.xp / xpMax) * 15)

            for (var i = 0; i <= 15; i++) {
                if (i <= percent) {
                    progressBar += "="
                } else {
                    progressBar += "-"
                }
            }
            
            const author = message.guild.members.cache.get(docs.uid).user

            let embed = new MessageEmbed()
                .setTitle(`${docs.xp} / ${xpMax} xp    |    #${docs.rank}`)
                .setColor('#47f5ee')
                .setDescription(`${progressBar} | Niveau ${docs.level}`)
                .setThumbnail(author.avatarURL())
                .setAuthor(
                    author.username, 
                    `https://i.pinimg.com/originals/f7/b4/1b/f7b41b0b170d8765d7f6684497c7763a.png`
                )
                
            return embed
        }
}

module.exports = SeeXp;