import { Command } from 'discord-akairo';
import Repository  from '../repository/Repository';
import { Message } from 'discord.js';

class PingCommand extends Command {
    constructor() {
        super('ping', {
           aliases: ['ping']
        });
    }

    async exec(message: Message) {
        const list = await Repository.getAllUsers();
        const ll = list.map(u => {
            return `${u.firstName} ${u.lastName}`;
        })
        console.log("info list all", ll);
        return message.reply('Pong!' + ll);
    }
}

module.exports = PingCommand;
