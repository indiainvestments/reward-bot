import { Command } from 'discord-akairo';
import { Message } from 'discord.js';
import Repository from '../repository/Repository';

class PingCommand extends Command {
    constructor() {
        super('ping', {
           aliases: ['ping']
        });
    }

    async exec(message: Message) {
        const list = await Repository.getLeaderboardInfo();
        // return;
        const display = list.map(entry => {
            return `${entry.user} has ${entry.karma} karma in the channel ${entry.channel}`
        });
        return message.reply('Pong!' + '\n' + display.join('\n'));
    }
}

module.exports = PingCommand;
