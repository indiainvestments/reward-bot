import { RedisClient } from 'redis';
import { promisify } from 'util';
import { IDBHelper, KarmaInfo } from '../types';

export default class DBHelperImpl implements IDBHelper {
  private readonly KEY_PREFIX = 'karmaInfo';

  private readonly delimiter = ':';

  private readonly redisClient: RedisClient;

  private getAsync: (key: string) => Promise<string>;

  private setAsync: (key: string, val: string) => Promise<void>;

  private getKeysAsync: (keys: string) => Promise<string[]>;

  constructor(redisClient: RedisClient) {
    this.redisClient = redisClient;
    this.getAsync = promisify(this.redisClient.get).bind(this.redisClient);
    this.setAsync = promisify(this.redisClient.set).bind(this.redisClient);
    this.getKeysAsync = promisify(this.redisClient.keys).bind(this.redisClient);
  }

  public async getKarmaForUserAndChannel(userID: string, channelID: string): Promise<number> {
    const karmaValue = await this.getAsync(this.getKeyFromUserAndChannel(userID, channelID));
    return parseInt(karmaValue, 10);
  }

  public async setKarmaForUserAndChannel(
    userID: string,
    channelID: string,
    karma: number,
  ): Promise<void> {
    await this.setAsync(this.getKeyFromUserAndChannel(userID, channelID), karma.toString());
  }

  public async getAllUserKarmaInfo(): Promise<KarmaInfo[]> {
    const keys = await this.getKeysAsync(this.getAllKeysForKarmaInfo());
    return Promise.all(
      keys.map(async (key) => {
        const karma = await this.getAsync(key);
        const [_, userID, channelID] = key.split(this.delimiter);
        return {
          userID,
          channelID,
          karma: parseInt(karma, 10),
        };
      }),
    );
  }

  public async getUserKarmaInfo(userID: string): Promise<KarmaInfo[]> {
    const keys = await this.getKeysAsync(this.getKeysFromUser(userID));
    return Promise.all(
      keys.map(async (key) => {
        const karma = await this.getAsync(key);
        const [_, id, channelID] = key.split(this.delimiter);
        return {
          userID: id,
          channelID,
          karma: parseInt(karma, 10),
        };
      }),
    );
  }

  private getKeyFromUserAndChannel(userID: string, channelID: string) {
    return `${this.KEY_PREFIX}${this.delimiter}${userID}${this.delimiter}${channelID}`;
  }

  private getAllKeysForKarmaInfo() {
    return `${this.KEY_PREFIX}${this.delimiter}*`;
  }

  private getKeysFromUser(userID: string) {
    return `${this.KEY_PREFIX}${this.delimiter}${userID}${this.delimiter}*`;
  }
}
