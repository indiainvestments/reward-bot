import { Command } from 'discord-akairo';
import { Message, MessageEmbed } from 'discord.js';
import Repository from '../repository/Repository';

export default class PingCommand extends Command {
    constructor() {
        super('ping', {
           aliases: ['ping']
        });
    }

    async exec(message: Message) {
        return message.reply('Pong!');
    }
}