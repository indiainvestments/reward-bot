import { MessageEmbed } from "discord.js";
import { UserKarmaInfo } from "./types";

export function getEmbedFromLeaderboardList(usersKarma: Record<string, number>): MessageEmbed {
    const embed = new MessageEmbed();
    const list = Object.keys(usersKarma).map((userID, idx) => {
        const rank = idx + 1;
        const karma = usersKarma[userID];
        return `**${rank}.** <@${userID}>   **${karma}** points`;
    })
    const desc = list.join('\n\n');
    return embed.setDescription(desc)
            .setTitle('Leaderboard')
            .setFooter('Leaderboard');
}

export function getEmbedFromUserKarma(userKarma: UserKarmaInfo[]) {
    const embed = new MessageEmbed();
    const list = userKarma.map((userKarmaInfo, idx) => {
        const rank = idx + 1;
        const karma = userKarmaInfo.karma;
        const channelID = userKarmaInfo.channel.id
        return `**${rank}.**  <#${channelID}>        **${karma}**`;
    })
    const desc = list.join('\n\n');
    return embed.setDescription(desc)
            .setTitle('Karma')
            .setFooter('Karma');
}