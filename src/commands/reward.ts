import { CommandUtil, Command } from 'discord-akairo';
import { Message, User } from 'discord.js';

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
      const { channel, mentions } = message;
      mentions.users.forEach((user: User): void => {
        // add checks like - can't award self
        // and give reward to relevant mentions
      });

      return channel.send(
        CommandUtil.transformOptions(`Rewarded ${mentions.users.map((user: User) => user)}`),
      );
    }
}

module.exports = ThanksCommand;
