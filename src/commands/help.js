const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const config = require('../utils/config')

class Help extends Command {
    constructor() {
        super('help', {
           aliases: ['help'] 
        });
    }

    exec(message) {
        var badChannel = true
        for (var channelBan of config.commandChannel) {
            if (badChannel && message.channel.id === channelBan) badChannel = false
        }
        if (badChannel) return
        if (this.hasAuthority(message)) {
            let embed = new MessageEmbed()
                    .setTitle(`Liste des commandes`)
                    .setFields([
                        {name:'**+addxp** *@utilisateur {quantité à ajouter}*', value:'Permet d\'ajouter de l\'expérience à un utilisateur'},
                        {name:'**+removexp** *@utilisateur {quantité à ajouter}*', value:'Permet de retirer de l\'expérience à un utilisateur'},
                        {name:'**+seexp** *@utilisateur*', value:'Permet de consulter son xp ou celui de quelqu\'un d\'autre'},
                        {name:'**+setlevel** *@utilisateur {niveau choisis}*', value:'Permet d\'assigner un niveau à un joueur'},
                        {name:'**+topxp**', value:'Affiche le top 10 des utilisateurs'},
                        {name:'**+removeuser** *{id de l\'utilisateur}*', value:'Permet de retirer un utilisateur de la base de donnée'}
                    ])
                    .setColor('#47f5ee')
                    .setThumbnail('https://i.pinimg.com/originals/f7/b4/1b/f7b41b0b170d8765d7f6684497c7763a.png')
    
            return message.channel.send({embeds: [embed]})
        } else {
            let embed = new MessageEmbed()
            .setTitle(`Liste des commandes`)
            .setFields([
                {name:'**+seexp** *@utilisateur*', value:'Permet de consulter son xp ou celui de quelqu\'un d\'autre'},
                {name:'**+topxp**', value:'Affiche le top 10 des utilisateurs'},
            ])
            .setColor('#47f5ee')
            .setThumbnail('https://i.pinimg.com/originals/f7/b4/1b/f7b41b0b170d8765d7f6684497c7763a.png')

            return message.channel.send({embeds: [embed]})
        }
    }

    hasAuthority(message){
        var hasAuthority = false
        for (var roleId of config.adminRoles) {
            if (message.member.roles.cache.some(r => r.id === roleId)) hasAuthority = true
        }
        return hasAuthority
    }
}

module.exports = Help;