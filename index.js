const { Client, Intents, Collection } = require("discord.js");
const {token} = require('./src/utils/env')
const config = require('./src/utils/config')
const fs = require('fs');
const FunctionLibrary = require("./src/structures/FunctionLibrary");
const User = require("./src/structures/User");
const { LevelModel } = require("./src/models/LevelModel");



const client = new Client({intents:[Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS]})

client.on('ready', () => {
    console.log("Bot ready !")
    require('./src/utils/dbConfig')
    client.guilds.fetch(config.guildId)
        .then(guild => { 
            console.log("Guild Founded")
            guild.members.fetch().then(members => {
                console.log("Members founded");
            })
        })
})

commands = new Collection()

const commandFiles = fs.readdirSync('./src/commands/').filter(file => file.endsWith('.js'))

for (const file of commandFiles) {
	const command = require(`./src/commands/${file}`);
    commands.set(command.data.name, command);
}

client.on('messageCreate', async message => {
    if (!message.author.bot) {
        if (message.content[0] === config.prefix) {
            if (FunctionLibrary.commandChannel(message)) {
                const command = message.content.split(' ')
                const commandName = command[0].replace(config.prefix,'')
                if (typeof commands.get(commandName) === 'undefined') return
                commands.get(commandName).exec(message)
            }
        } else {
            LevelModel.findOne({uid:message.author.id}, (err,docs) => {
                if (err) throw err
                if (docs !== null) {
                    const user = new User({uid:docs.uid,
                        totalXp:docs.totalXp,
                        xp:docs.xp,
                        lastMessage:docs.lastMessage,
                        level:docs.level,
                        guild:message.guild})
    
                    const xpToAdd = 5 + Math.trunc(Math.random() * 11)
                    
                    user.xpGain(xpToAdd)
                } else {
                    const today = new Date().getTime()
                    LevelModel.create({uid:message.author.id,totalXp:0,level:0,xp:0, lastMessage:today}, (err) => { if (err) throw err })
                }
            })
        }
    }
})

client.on('guildMemberAdd', (member) => {
    return member.guild.channels.cache.get(config.greetings.welcome).send(`
On capture ${member} dans la pok??ball, faisons ensemble un grand voyage !
__Lis bien les r??gles__ afin de devenir un membre de notre ligue !
*Tu auras acc??s ?? l???int??gralit?? des salons une fois que cela sera fait, bonne chance !*
        `)
})

client.on('guildMemberRemove', (member) => {
    return member.guild.channels.cache.get(config.greetings.goodbye).send(`**${member.user.tag}** s'est ??chapp?? ! Dommage...`)
})

client.login(token)