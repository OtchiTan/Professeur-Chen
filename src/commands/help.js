const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed } = require('discord.js')
const FunctionLibrary = require('../structures/FunctionLibrary')

module.exports = {
    data: new SlashCommandBuilder()
        .setName(`help`).
        setDescription(`Affiche la liste des commandes disponible sur le bot`),

    async exec(message) {
        let embed = new MessageEmbed({
            title:"Liste des commandes",
            color:'#47f5ee',
            thumbnail:"https://i.pinimg.com/originals/f7/b4/1b/f7b41b0b170d8765d7f6684497c7763a.png"
        })
        if (FunctionLibrary.hasAuthority(message)) {
                embed.setFields([
                    {name:'**+addxp** *@utilisateur {quantité à ajouter}*', value:'Permet d\'ajouter de l\'expérience à un utilisateur'},
                    {name:'**+removexp** *@utilisateur {quantité à ajouter}*', value:'Permet de retirer de l\'expérience à un utilisateur'},
                    {name:'**+seexp** *@utilisateur*', value:'Permet de consulter son xp ou celui de quelqu\'un d\'autre'},
                    {name:'**+setlevel** *@utilisateur {niveau choisis}*', value:'Permet d\'assigner un niveau à un joueur'},
                    {name:'**+topxp**', value:'Affiche le top 10 des utilisateurs'},
                    {name:'**+removeuser** *{id de l\'utilisateur}*', value:'Permet de retirer un utilisateur de la base de donnée'}
                ])
                return message.reply({embeds:[embed]})
        } else {
            embed.setFields([
                {name:'**+seexp** *@utilisateur*', value:'Permet de consulter son xp ou celui de quelqu\'un d\'autre'},
                {name:'**+topxp**', value:'Affiche le top 10 des utilisateurs'},
            ])

            return message.reply({embeds:[embed]})
        }
    }
}