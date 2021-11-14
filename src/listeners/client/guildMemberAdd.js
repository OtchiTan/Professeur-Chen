const { Listener } = require('discord-akairo');
const config = require('../../utils/config')

class GuildMemberAddListener extends Listener {
    constructor() {
        super('guildMemberAdd', {
            emitter: 'client',
            event: 'guildMemberAdd'
        });
    }

    exec(member) {
        return member.guild.channels.cache.get(config.greetings.welcome).send(`
On capture ${member} dans la pokéball, faisons ensemble un grand voyage !
__Lis bien les règles__ afin de devenir un membre de notre ligue !
*Tu auras accès à l’intégralité des salons une fois que cela sera fait, bonne chance !*
        `)
    }
}

module.exports = GuildMemberAddListener;