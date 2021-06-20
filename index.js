const { AkairoClient, CommandHandler } = require('discord-akairo');

class MyClient extends AkairoClient {
    constructor() {
        super({}, {
            disableMentions: 'everyone'
        });

        this.commandHandler = new CommandHandler(this, {
          directory: './commands/',
          prefix: '.' // or ['?', '!']
        });

        this.commandHandler.loadAll();
    }
}

const client = new MyClient();
client.login(process.env.BOT_TOKEN);
