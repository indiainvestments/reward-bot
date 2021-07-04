import 'reflect-metadata';
import { createConnection, ConnectionOptions } from 'typeorm';
import { AkairoClient, CommandHandler } from 'discord-akairo';
import { DISCORD_BOT_TOKEN, DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USERNAME } from './env';

class MyClient extends AkairoClient {
  public commandHandler: CommandHandler = new CommandHandler(this, {
    directory: `${__dirname}/commands/`,
    prefix: '.', // or ['?', '!']
  });

  constructor() {
    super(
      {},
      {
        disableMentions: 'everyone',
      },
    );

    this.commandHandler.loadAll();
  }
}
export const client = new MyClient();

const options: ConnectionOptions = {
  type: 'postgres',
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,
  entities: [`${__dirname}/entity/*.js`],
  synchronize: true,
  logging: false,
  ssl: {
    rejectUnauthorized: false,
  },
};
createConnection(options)
  .then(async (_) => {
    console.log('DB ok');
    client.login(DISCORD_BOT_TOKEN);
  })
  .catch((err) => console.log('DB error', err));
