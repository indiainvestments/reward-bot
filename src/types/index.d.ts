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