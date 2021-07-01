import { User } from "discord.js";
import { RewardEvent } from "../entity/RewardEvent";
import {ClientOpts, createClient, RedisClient} from 'redis';
import { client } from '../index';
import { KarmaInfo, KarmaInfoDisplay, UserKarmaInfo } from "../types";
import { promisify } from "util";
import { guild_id, karma_info_db_host, karma_info_db_password, karma_info_db_port } from "../env";

class Repository {
    private redisClient: RedisClient;
    private getAsync: (key: string) => string;
    private setAsync: (key: string, val: string) => void;
    private getKeysAsync: (keys: string) => string[];
    
    constructor() {
        const redisOpts: ClientOpts = {
            host: karma_info_db_host,
            port: karma_info_db_port,
            password: karma_info_db_password
        };
        this.redisClient = createClient(redisOpts);
        this.getAsync = promisify(this.redisClient.get).bind(this.redisClient);
        this.setAsync = promisify(this.redisClient.set).bind(this.redisClient);
        this.getKeysAsync = promisify(this.redisClient.keys).bind(this.redisClient);
    }

    public saveRewardEvent(rewarder: User, rewardees: User[], channelID: string, karma: number = 1) {
        rewardees.forEach(async (rewardee) => {
            const eventInstance = new RewardEvent();
            eventInstance.rewarder = rewarder.id;
            eventInstance.timestamp = new Date();
            eventInstance.karma = karma;
            eventInstance.channel = channelID;
            eventInstance.rewardee = rewardee.id;
            await RewardEvent.save(eventInstance);
            this.setRewardeeChannelKarma(rewardee.id, channelID, karma);
        });
        
    }

    public async getLeaderboardInfo(): Promise<KarmaInfoDisplay[]> {
        const keys = await this.getKeysAsync('karmaInfo:*');
        const karmaInfo: KarmaInfo[] = await Promise.all(keys.map(async (key) => {
            const karma = await this.getAsync(key);
            const [_, userID, channelID] = key.split(':');
            return {
                userID,
                channelID,
                karma: parseInt(karma)
            }
        }));
        const userIDList = karmaInfo.map(info => info.userID);
        
        const guild = await client.guilds.fetch(guild_id);
        const guildChannels = guild.channels.valueOf();
        const userList = await guild.members.fetch({user: userIDList});
        const userKarmaList = karmaInfo.map(info => {
            const user = userList.get(info.userID).user;
            return {
                user,
                karma: info.karma,
                channel: guildChannels.get(info.channelID)
            }
        });
        return userKarmaList.sort((a, b) => b.karma - a.karma);
    }

    public async getUserKarmaInfo(userID: string): Promise<UserKarmaInfo[] | undefined> {
        const keys = await this.getKeysAsync(`karmaInfo:${userID}:*`);
        const karmaInfo: KarmaInfo[] = await Promise.all(keys.map(async (key) => {
            const karma = await this.getAsync(key);
            const [_, userID, channelID] = key.split(':');
            return {
                userID,
                channelID,
                karma: parseInt(karma)
            }
        }));
        if (karmaInfo.length <= 0) {
            return undefined;
        }

        const guild = await client.guilds.fetch(guild_id);
        const guildChannels = guild.channels.valueOf();
        return karmaInfo.map((info) => {
            return {
                karma: info.karma,
                channel: guildChannels.get(info.channelID)
            }
        });
    }

    private setRewardeeChannelKarma(userID: string, channelID: string, karmaPts: number): void {
        this.redisClient.GET(`karmaInfo:${userID}:${channelID}`, (err: Error, reply: string) => {
            if (err) {
                console.log(err);
                return;
            }
            let karma = 0;
            if (reply) {
                karma = parseInt(reply);
            }
            karma = karma + karmaPts;
            this.redisClient.SET(`karmaInfo:${userID}:${channelID}`, `${karma}`, (err: Error) => {
                if (err) {
                    console.log(err);
                    return;
                }
            });
        });
    }
}

export default new Repository();