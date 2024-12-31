const { Client, GatewayIntentBits, Collection } = require('discord.js');
const keepAlive = require('./keep_alive');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.MessageContent] });
client.commands = new Collection();

// Actual code
// Do It Yourself

keepAlive();

client.login("Your_Bot_Token");
