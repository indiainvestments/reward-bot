import { CommandUtil, Command } from 'discord-akairo';
import { Message, User } from 'discord.js';
import Repository from '../repository/Repository';

class ThanksCommand extends Command {
    constructor() {
      super('thanks', {
        category: 'random'
      });
    }
    private thanksTriggers = [
        'thanks',
        'thank you',
        'thxs',
        'ty',
        'tq'
    ];

    regex = new RegExp('\\b' + this.thanksTriggers.join('\\b|\\b') + '\\b', 'i');

    exec(message: Message) {
        const { channel, mentions, author } = message;
        if (mentions.users.size <= 0) return;
        const rewardees: User[] = [];
        mentions.users.forEach((user: User): void => {
            // add checks like - can't award self
            // and give reward to relevant mentions
            if (user.id !== author.id) {
                rewardees.push(user);
            }
        });
        if (rewardees.length <= 0) return;
        Repository.saveRewardEvent(author, rewardees, channel.id);
        return channel.send(
            CommandUtil.transformOptions(`Rewarded ${rewardees.map((user: User) => user)}`),
        );
    }
}

module.exports = ThanksCommand;
