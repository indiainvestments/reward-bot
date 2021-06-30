import "reflect-metadata";
import { createConnection, ConnectionOptions } from "typeorm";
import { AkairoClient, CommandHandler } from 'discord-akairo';
import { discord_bot_token, reward_event_db_host, reward_event_db_name, reward_event_db_password, reward_event_db_port, reward_event_db_username } from "./env";
class MyClient extends AkairoClient {
    public commandHandler: CommandHandler = new CommandHandler(this, {
        directory: __dirname + '/commands/',
        prefix: '.' // or ['?', '!']
      });

    constructor() {
        super({}, {
            disableMentions: 'everyone'
        });

        this.commandHandler.loadAll();
    }
}
export const client = new MyClient();

const options: ConnectionOptions = {
    type: 'postgres',
    host: reward_event_db_host,
    port: reward_event_db_port,
    username: reward_event_db_username,
    password: reward_event_db_password,
    database: reward_event_db_name,
    entities: [
        __dirname + '/entity/*.js',
    ],
    synchronize: true,
    logging: false,
    ssl: {
        rejectUnauthorized: false
    }
};
createConnection(options)
    .then(async (connection) => {
        console.log("DB ok");
        client.login(discord_bot_token);
    })
    .catch((err) => console.log("DB error", err));



