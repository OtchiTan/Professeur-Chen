const { LevelModel } = require("../models/LevelModel");
const config = require('../utils/config')

class User {
    constructor(props) {
        this.uid = props.uid
        this.totalXp = props.totalXp
        this.actualXp = props.actualXp
        this.lastMessage = new Date(props.lastMessage)
        this.level = props.level
        this.guild = props.guild

        this.roleList = new Map()
        for (var i = 0; i < config.level.roleId.length; i++) {
            this.roleList.set(config.level.roleLevel[i], config.level.roleId[i])
        }
    }

    canGainXp() {
        let today = new Date()

        return today.getMinutes() !== this.lastMessage.getMinutes() || today.getHours() !== this.lastMessage.getHours()
    }

    xpGain(xpToAdd) {
        if (this.canGainXp()) {
            const nextLevel = 5 * (Math.pow(this.level,2)) + (50 * this.level) + 100
            this.totalXp += xpToAdd
            this.actualXp += xpToAdd
            this.lastMessage = new Date().getTime()

            LevelModel.updateOne({uid:this.uid}, {lastMessage:this.lastMessage, totalXp:this.totalXp, actualXp:this.actualXp}, (err) => { if (err) throw err})

            if (this.actualXp >= nextLevel) this.levelUp()
        }
    }

    levelUp() {
        this.level++
        this.actualXp = 0
        LevelModel.findOneAndUpdate({uid:this.uid},{level:this.level, actualXp:this.actualXp}, (err) => {
            if (err) throw err
            const author = this.guild.members.cache.get(this.uid)
            this.guild.channels.cache.get(config.level.channelAnnouncement).send(`${author} s'approche du titre de meilleur dresseur Pokémon ! Tu as ${this.level} badges à ton actif !`)
    
            if (typeof this.roleList.get(this.level) !== "undefined") {
                const newRole = this.roleList.get(this.level)
                const roleName = this.guild.roles.cache.find(role => role.id === newRole).name

                const roleManager = author.roles
                
                roleManager.add(newRole)
                
                if(this.level !== 1) {
                    if (this.level == 10) roleManager.remove(this.roleList.get(1))
                    else if (this.level > 10) roleManager.remove(this.roleList.get(this.level - 10))
                } 
    
                this.guild.channels.cache.get(config.level.channelAnnouncement).send(`Tu viens de passer **${roleName}** félicitations !`)
            }
        })
    }
    
    setLevel(newLevel) {
        this.level = newLevel
        this.actualXp = 0
        if (newLevel > 0) {
            this.totalXp = 5 * (Math.pow(newLevel-1,2)) + (50 * newLevel-1) + 100            
        } else {
            this.totalXp = 0            
        }

        LevelModel.findOneAndUpdate({uid:this.uid},{level:this.level,actualXp:this.actualXp,totalXp:this.totalXp}, (err) => {
            if (err) throw err
        })
    }
}

module.exports = User