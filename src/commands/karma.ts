import { Command } from 'discord-akairo';
import { Message } from 'discord.js';
import { no_karma_reply } from '../const';
import Repository from '../repository/Repository';
import { UserKarmaInfo } from '../types';
import { getEmbedFromUserKarma } from '../util';

export default class LeaderboardCommand extends Command {
    constructor() {
        super('karma', {
           aliases: ['karma']
        });
    }

    async exec(message: Message) {
        const { author } = message;
        const userKarma: UserKarmaInfo[] | undefined = await Repository.getUserKarmaInfo(author.id);
        if (!userKarma) {
            return message.reply(no_karma_reply);
        }
        const userKarmaEmbed = getEmbedFromUserKarma(userKarma);
        userKarmaEmbed.setAuthor(author.username, author.avatarURL() ?? author.defaultAvatarURL);
        return message.reply({
            embed: userKarmaEmbed
        });
    }
}

