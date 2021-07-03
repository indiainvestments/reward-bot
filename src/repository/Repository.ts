import { User } from "discord.js";
import { RewardEvent } from "../entity/RewardEvent";
import {ClientOpts, createClient, RedisClient} from 'redis';
import { client } from '../index';
import { KarmaInfo, KarmaInfoDisplay, UserKarmaInfo } from "../types";
import { DISCORD_GUILD_ID, REDIS_HOST, REDIS_PASSWORD, REDIS_PORT } from "../env";
import DBHelperImpl from "../helper/DBHelperImpl";

class Repository {
    private redisClient: RedisClient;
    private dbHelper: DBHelperImpl;
    constructor() {
        const redisOpts: ClientOpts = {
            host: REDIS_HOST,
            port: REDIS_PORT,
            password: REDIS_PASSWORD
        };
        this.redisClient = createClient(redisOpts);
        this.dbHelper = new DBHelperImpl(this.redisClient);
    }

    public async saveRewardEvent(rewarder: User, rewardees: User[], channelID: string, karma: number = 1) {
        await Promise.all(rewardees.map(async (rewardee) => {
            const eventInstance = new RewardEvent();
            eventInstance.rewarder = rewarder.id;
            eventInstance.timestamp = new Date();
            eventInstance.karma = karma;
            eventInstance.channel = channelID;
            eventInstance.rewardee = rewardee.id;
            await RewardEvent.save(eventInstance);
            await this.setRewardeeChannelKarma(rewardee.id, channelID, karma);
        }));

    }

    public async getLeaderboardInfo(): Promise<KarmaInfoDisplay[]> {
        const karmaInfo = await this.dbHelper.getAllUserKarmaInfo();
        const userIDList = karmaInfo.map(info => info.userID);
        const guild = await client.guilds.fetch(DISCORD_GUILD_ID);
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
        const karmaInfo: KarmaInfo[] = await this.dbHelper.getUserKarmaInfo(userID);
        if (karmaInfo.length <= 0) {
            return undefined;
        }
        const guild = await client.guilds.fetch(DISCORD_GUILD_ID);
        const guildChannels = guild.channels.valueOf();
        return karmaInfo.map((info) => {
            return {
                karma: info.karma,
                channel: guildChannels.get(info.channelID)
            }
        });
    }

    private async setRewardeeChannelKarma(userID: string, channelID: string, karmaPts: number): Promise<void> {
        const currentKarma = await this.dbHelper.getKarmaForUserAndChannel(userID, channelID);
        await this.dbHelper.setKarmaForUserAndChannel(userID, channelID, (currentKarma || 0) + karmaPts);
    }
}

export default new Repository();