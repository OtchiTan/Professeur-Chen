const { Listener } = require('discord-akairo');
const { LevelModel } = require('../../models/LevelModel');
const config = require('../../utils/config')

class MessageCreateListener extends Listener {
    constructor() {
        super('messageCreate', {
            emitter: 'client',
            event: 'messageCreate'
        });

        this.roleList = new Map()
        for (var i = 0; i < config.level.roleId.length; i++) {
            this.roleList.set(config.level.roleLevel[i], config.level.roleId[i])
        }
    }

    exec(message) {
        if (message.author.id == "908349301732802580") return

        for (var channel of config.level.channelException) {
            if (message.channel.id === channel) return
        }

        LevelModel.findOne({uid:message.author.id}, (err,docs) => {
            let today = new Date()
            if (err) throw err
            if (docs !== null) {
                let lastMesssage = new Date(docs.lastMessage)
                if (lastMesssage.getMinutes() !== today.getMinutes() || lastMesssage.getHours() !== today.getHours()) {
                    this.xpGain(message.author.id, docs.xp, docs.level, docs.totalXp,message, today)
                }
            } else {
                LevelModel.find({}).exec((err,docs) => {
                    if (err) throw err
                    LevelModel.create({
                        uid:message.author.id,
                        level:0,
                        xp:0,
                        lastMessage:today.getTime(),
                        rank:docs.length+1,
                        totalXp:0
                    })
                })
            }
        })
    }

    xpGain(uid,actualXp, actualLevel, totalXp, message, today) {
        let xpToAdd = 15 + Math.floor((Math.random() * 11))
        let newXp = actualXp + xpToAdd

        LevelModel.updateOne({uid:uid}, {xp:newXp, lastMessage:today, totalXp:totalXp+xpToAdd}, (err) => { if (err) throw err})   

        LevelModel.findOne({uid:message.author.id}, (err, docs) => {
            if (err) throw err
            LevelModel.findOne({rank:docs.rank-1}, (err, userUp) => {
                if (err) throw err
                LevelModel.findOne({rank:docs.rank+1}, (err, userDown) => {
                    if (err) throw err
                    if (userUp !== null && docs.totalXp > userUp.totalXp){
                        LevelModel.findOneAndUpdate({uid:docs.uid}, {rank:docs.rank - 1}, (err) => {if (err) throw err})
                        LevelModel.findOneAndUpdate({uid:userUp.uid}, {rank:userUp.rank + 1}, (err) => {if (err) throw err})
                    }
                    if (userDown !== null && docs.totalXp < userDown.totalXp) {
                        LevelModel.findOneAndUpdate({uid:docs.uid}, {rank:docs.rank + 1}, (err) => {if (err) throw err})
                        LevelModel.findOneAndUpdate({uid:userDown.uid}, {rank:userDown.rank - 1}, (err) => {if (err) throw err})
                    }
                })
            })
        })

        const nextLevel = 5 * (Math.pow(actualLevel,2)) + (50 * actualLevel) + 100
        if (newXp >= nextLevel) this.levelUp(uid,actualLevel, message)
    }

    levelUp(uid, actualLevel, message) {
        let newLevel = actualLevel + 1
        LevelModel.updateOne({uid:uid}, {level:newLevel, xp:0}, (err) => { if (err) throw err})

        message.guild.channels.cache.get(config.level.channelAnnouncement).send(`${message.author} s'approche du titre de meilleur dresseur Pokémon ! Tu as ${newLevel} badges à ton actif !`)

        if (typeof this.roleList.get(newLevel) !== "undefined") {
            const newRole = this.roleList.get(newLevel)
            const roleName = message.guild.roles.cache.find(r => r.id === newRole).name
            
            const roleManager = message.member.roles

            roleManager.add(newRole)
            
            if(newLevel !== 1) {
                if (newLevel == 10) roleManager.remove(this.roleList.get(1))
                else if (newLevel > 10) roleManager.remove(this.roleList.get(newLevel - 10))
            } 

            message.guild.channels.cache.get(config.level.channelAnnouncement).send(`Tu viens de passer **${roleName}** félicitations !`)
        }
    }    
}

module.exports = MessageCreateListener;