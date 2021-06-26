import { Command } from 'discord-akairo';
import { Message } from 'discord.js';

class PingCommand extends Command {
    constructor() {
        super('ping', {
           aliases: ['ping']
        });
    }

    async exec(message: Message) {
        return message.reply('Pong!');
    }
}

module.exports = PingCommand;
