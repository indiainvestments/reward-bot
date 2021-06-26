import "reflect-metadata";
import { createConnection, ConnectionOptions } from "typeorm";
import { AkairoClient, CommandHandler } from 'discord-akairo';

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
const client = new MyClient();

const options: ConnectionOptions = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE_NAME,
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
        client.login(process.env.BOT_TOKEN);
    })
    .catch((err) => console.log("DB error", err));



