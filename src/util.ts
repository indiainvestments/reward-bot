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
    embed.setDescription(desc);
    embed.setTitle('Leaderboard')
    embed.setFooter('Leaderboad');
    return embed;
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
    embed.setDescription(desc);
    embed.setTitle('Karma')
    embed.setFooter('Karma');
    return embed;
}