const { Command, CommandUtil } = require('discord-akairo');

class ThanksCommand extends Command {
    constructor() {
      super('thanks', {
        category: 'random'
      });
    }

    regex() {
      const thanksTriggers = [
        'thanks',
        'thank',
        'thxs',
        'ty',
        'tq'
      ];

      return new RegExp(thanksTriggers.join('|'), 'i');
    }

    exec(message) {
      const { channel, mentions } = message;

      mentions.users.forEach((user) => {
        // add checks like - can't award self
        // and give reward to relevant mentions
      });

      return channel.send(
        CommandUtil.transformOptions(`Rewarded ${mentions.users.map(user => user)}`),
      );
    }
}

module.exports = ThanksCommand;
