const { Listener } = require('discord-akairo');
const config = require('../../utils/config')

class GuildMemberRemoveListener extends Listener {
    constructor() {
        super('guildMemberRemove', {
            emitter: 'client',
            event: 'guildMemberRemove'
        });
    }

    exec(member) {
        return member.guild.channels.cache.get(config.greetings.channel).send(`**${member.user.tag}** s'est échappé ! Dommage...`)
    }
}

module.exports = GuildMemberRemoveListener;