import { GuildChannel, User } from 'discord.js';
export interface KarmaInfo {
    userID: string;
    channelID: string;
    karma: number;
}

export interface KarmaInfoDisplay extends UserKarmaInfo{
    user: User,
}

export interface UserKarmaInfo {
    karma: number;
    channel: GuildChannel;
}

export interface IDBHelper {
    getKarmaForUserAndChannel: (userID: string, channelID: string) => Promise<number>;
    setKarmaForUserAndChannel: (userID: string, channelID: string, karma: number) => Promise<void>;
    getAllUserKarmaInfo: () => Promise<KarmaInfo[]>;
    getUserKarmaInfo: (userID: string) => Promise<KarmaInfo[]>;
}