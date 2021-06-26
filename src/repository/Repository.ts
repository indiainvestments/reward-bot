import { User } from "discord.js";
import { RewardEvent } from "../entity/RewardEvent";
import { Users } from "../entity/Users";

class Repository {
    public async getAllUsers() {
        return await Users.find();
    }

    public async saveRewardEvent(rewarder: User, rewardees: User[], channelID: string) {
        const eventInstance = new RewardEvent();
        eventInstance.rewarder = rewarder.id;
        eventInstance.timestamp = new Date();
        eventInstance.karma = 1;
        eventInstance.channel = channelID;
        rewardees.forEach(async (rewardee) => {
            eventInstance.rewardee = rewardee.id;
            await RewardEvent.save(eventInstance);
        });
    }
}

export default new Repository();