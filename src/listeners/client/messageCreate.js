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
        this.roleList.set(1, "908642315344674877")
        this.roleList.set(10, "908642341458444318")
        this.roleList.set(20, "908642362576752690")
    }

    exec(message) {
        if (message.author.id == "908349301732802580") return
        LevelModel.findOne({uid:message.author.id}, (err,docs) => {
            let today = new Date()
            if (err) throw err
            if (docs !== null) {
                let lastMesssage = new Date(docs.lastMessage)
    
                if (lastMesssage.getMinutes() !== today.getMinutes()) this.xpGain(message.author.id, docs.xp, docs.level, message, today)
            } else {
                LevelModel.create({
                    uid:message.author.id,
                    level:0,
                    xp:0,
                    lastMessage:today.getTime()
                })
            }
        })
    }

    xpGain(uid,actualXp, actualLevel, message, today) {
        let xpToAdd = 15 + Math.floor((Math.random() * 11))
        let newXp = actualXp + xpToAdd

        LevelModel.updateOne({uid:uid}, {xp:newXp, lastMessage:today}, (err) => { if (err) throw err})   

        const nextLevel = 5 * (Math.pow(actualLevel,2)) + (50 * actualLevel) + 100
        if (newXp >= nextLevel) this.levelUp(uid,actualLevel, message)
    }

    levelUp(uid, actualLevel, message) {
        let newLevel = actualLevel + 1
        LevelModel.updateOne({uid:uid}, {level:newLevel}, (err) => { if (err) throw err})

        message.guild.channels.cache.get(config.level.channel)
            .send(`${message.author} s'approche du titre de meilleur dresseur Pokémon ! Tu as ${newLevel} badges à ton actif !`)

        if (typeof this.roleList.get(newLevel) !== "undefined") {
            const newRole = this.roleList.get(newLevel)
            const roleName = message.guild.roles.cache.find(r => r.id === newRole).name
            
            const roleManager = message.member.roles

            roleManager.add(newRole)
            
            if(newLevel !== 1) {
                if (newLevel == 10) roleManager.remove(this.roleList.get(1))
                else if (newLevel > 10) roleManager.remove(this.roleList.get(newLevel - 10))
            } 

            message.guild.channels.cache.get(config.level.channel)
                .send(`Tu viens de passer **${roleName}** félicitations !`)
        }
    }    
}

module.exports = MessageCreateListener;