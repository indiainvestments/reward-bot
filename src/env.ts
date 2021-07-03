// reward event db
export const reward_event_db_host = process.env.DB_HOST;
export const reward_event_db_port = parseInt(process.env.DB_PORT);
export const reward_event_db_username = process.env.DB_USERNAME;
export const reward_event_db_password = process.env.DB_PASSWORD;
export const reward_event_db_name = process.env.DB_DATABASE_NAME;

// bot
export const discord_bot_token = process.env.BOT_TOKEN;

// guild id
export const guild_id = process.env.GUILD_ID;

// karma info redis db
export const karma_info_db_host = process.env.REDIS_DB_HOST;
export const karma_info_db_port = parseInt(process.env.REDIS_DB_PORT);
export const karma_info_db_password = process.env.REDIS_DB_PASSWORD;