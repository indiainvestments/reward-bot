import { Command } from 'discord-akairo';
import { Message } from 'discord.js';
import { LEADERBOARD_COOLDOWN, LEADERBOARD_RAETLIMIT } from '../const';
import Repository from '../repository/Repository';
import { getEmbedFromLeaderboardList } from '../util';

export default class LeaderboardCommand extends Command {
  constructor() {
    super('leaderboard', {
      aliases: ['leaderboard'],
      cooldown: LEADERBOARD_COOLDOWN,
      ratelimit: LEADERBOARD_RAETLIMIT,
    });
  }

  async exec(message: Message) {
    const { author } = message;
    const list = await Repository.getLeaderboardInfo();
    const userKarma = list.reduce(
      (acc, item) => ({
        ...acc,
        [item.user.id]: (acc[item.user.id] || 0) + item.karma,
      }),
      {} as Record<string, number>,
    );
    const leaderboardEmbed = getEmbedFromLeaderboardList(userKarma);
    leaderboardEmbed.setAuthor(author.username, author.avatarURL() ?? author.defaultAvatarURL);
    return message.reply({
      embed: leaderboardEmbed,
    });
  }
}
