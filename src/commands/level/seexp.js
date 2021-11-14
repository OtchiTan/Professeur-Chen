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
        if (message.channel.id != config.commandChannel) return

        if (args.userToSee !== null) {
            LevelModel.findOne({uid:args.userToSee.id}, (err, docs) => {
                if (err) throw err
                const embed = this.showXp(docs)
                return message.channel.send({embeds: [embed]})
            })            
        } else {
            LevelModel.findOne({uid:message.author.id}, (err, docs) => {
                if (err) throw err
                const embed = this.showXp(docs)
                return message.channel.send({embeds: [embed]})
            })
        }        
    }

        showXp(docs) {
            const xpMax = 5 * (Math.pow(docs.level+1,2)) + (50 * docs.level+1) + 100

            var progressBar = ""
            const percent = Math.round((docs.xp / xpMax) * 20)

            for (var i = 0; i <= 20; i++) {
                if (i <= percent) {
                    progressBar += "="
                } else {
                    progressBar += "-"
                }
            }

            let embed = new MessageEmbed()
                .setTitle(`${docs.xp} / ${xpMax} xp`)
                .setColor('PURPLE')
                .setDescription(`${progressBar} | Niveau ${docs.level}`)
                .setThumbnail('https://i.pinimg.com/originals/f7/b4/1b/f7b41b0b170d8765d7f6684497c7763a.png')
                .setAuthor(
                    'Professeur Chen', 
                    'https://cdn.discordapp.com/avatars/908349301732802580/6a2f4968c29b2470e21c6b85328056f5.png?size=256'
                )
                
            return embed
        }
}

module.exports = SeeXp;