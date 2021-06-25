import "reflect-metadata";
import { createConnection, ConnectionOptions } from "typeorm";
import { User } from "./entity/User";
// import { AkairoClient, CommandHandler } from 'discord-akairo';

// class MyClient extends AkairoClient {
//     constructor() {
//         super({}, {
//             disableMentions: 'everyone'
//         });
//         this.commandHandler = new CommandHandler(this, {
//           directory: './commands/',
//           prefix: '.' // or ['?', '!']
//         });

//         this.commandHandler.loadAll();
//     }
// }
// const client = new MyClient();
const options: ConnectionOptions = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE_NAME,
    entities: [
        __dirname + '/entity/*.js'
    ],
    synchronize: true,
    logging: true,
    ssl: {
        rejectUnauthorized: false
    }
};
createConnection(options)
    .then(async (connection) => {
        console.log("DB ok", connection);
        // client.login(process.env.BOT_TOKEN);
        const user = new User();
        user.firstName = "Timber";
        user.lastName = "Saw";
        user.isActive = true;
        await user.save();
        console.log(await User.find());
    })
    .catch((err) => console.log("DB error", err));



