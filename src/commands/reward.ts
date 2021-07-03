import { CommandUtil, Command } from 'discord-akairo';
import { Message, User } from 'discord.js';
import Repository from '../repository/Repository';

export default class ThanksCommand extends Command {
  constructor() {
    super('thanks', {
      category: 'random',
    });
  }

  private thanksTriggers = ['thanks', 'thank you', 'thxs', 'ty', 'tq'];

  regex = new RegExp(`\\b${this.thanksTriggers.join('\\b|\\b')}\\b`, 'i');

  exec(message: Message) {
    const { channel, mentions, author: rewarder } = message;

    // if there is no mention, do nothing
    if (mentions.users.size <= 0) return;

    // else, create rewardee list
    const rewardees: User[] = mentions.users
      .filter((mentionedUser: User) => mentionedUser.id !== rewarder.id)
      .array();

    // if rewarder only mentioned themselves, do nothing
    if (rewardees.length <= 0) return;

    // else, save reward transaction in database
    Repository.saveRewardEvent(rewarder, rewardees, channel.id);

    // acknowledge the transaction
    return channel.send(
      CommandUtil.transformOptions(`Rewarded ${rewardees.map((user: User) => user)}`),
    );
  }
}
