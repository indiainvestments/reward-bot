import { AkairoClient, CommandHandler } from 'discord-akairo';
import 'dotenv-safe/config';
import 'reflect-metadata';
import { ConnectionOptions, createConnection } from 'typeorm';
import { DATABASE_URL, DISCORD_BOT_TOKEN } from './env';

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
  url: DATABASE_URL,
  type: 'postgres',
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
