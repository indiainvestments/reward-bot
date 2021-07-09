// Postgres
export const DATABASE_URL = process.env.DATABASE_URL;

// Discord
export const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;
export const DISCORD_GUILD_ID = process.env.DISCORD_GUILD_ID;

// Redis
export const REDIS_HOST = process.env.REDIS_DB_HOST;
export const REDIS_PORT = parseInt(process.env.REDIS_DB_PORT, 10);
export const REDIS_PASSWORD = process.env.REDIS_DB_PASSWORD;
