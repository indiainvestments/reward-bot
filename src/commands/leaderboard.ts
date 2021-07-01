import { Command } from 'discord-akairo';
import { Message } from 'discord.js';
import Repository from '../repository/Repository';
import { getEmbedFromLeaderboardList } from '../util';

export default class LeaderboardCommand extends Command {
    constructor() {
        super('leaderboard', {
           aliases: ['leaderboard']
        });
    }

    async exec(message: Message) {
        const { author } = message;
        const list = await Repository.getLeaderboardInfo();
        const userKarma: Record<string, number> = {};
        list.forEach((item) => {
            userKarma[item.user.id] = (userKarma[item.user.id] || 0) + item.karma;
        });
        const leaderboardEmbed = getEmbedFromLeaderboardList(userKarma);
        leaderboardEmbed.setAuthor(author.username, author.avatarURL() ?? author.defaultAvatarURL);
        return message.reply({
            embed: leaderboardEmbed
        });
    }
}

