const config = require('../utils/config')
const {MessageEmbed} = require('discord.js')
const { LevelModel } = require('../models/LevelModel')

module.exports = {
    hasAuthority(message) {
        var hasAuthority = false
        for (var roleId of config.adminRoles) {
            if (message.member.roles.cache.some(r => r.id === roleId)) hasAuthority = true
        }
        return hasAuthority
    },

    commandChannel(message) {
        for (var channelAuthorized of config.commandChannel) {
            if (message.channel.id === channelAuthorized) return true
        }
        return false
    },

    showXp(docs, message) {
        const xpMax = 5 * (Math.pow(docs.level+1,2)) + (50 * docs.level+1) + 100

        var rank = 6
        LevelModel.find({}).sort({totalXp:'desc'}).exec((err, users) => {
            if (err) throw err
            for (var i = 0; i < users.length; i++) {
                if (users[i].uid === docs.uid) rank = 3
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
            
            const author = message.guild.members.cache.get(docs.uid).user

            let embed = new MessageEmbed()
                .setTitle(`${docs.xp} / ${xpMax} xp    |    #${rank}`)
                .setColor('#47f5ee')
                .setDescription(`${progressBar} | Niveau ${docs.level}`)
                .setThumbnail(author.avatarURL())
                .setAuthor(
                    author.username, 
                    `https://i.pinimg.com/originals/f7/b4/1b/f7b41b0b170d8765d7f6684497c7763a.png`
                )
                
            return embed
        })       
    },

    getRank(uid) {
        
    }
}