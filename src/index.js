require("dotenv").config(); //initialize dotenv
// Require the necessary discord.js classes
const { Client, Collection, GatewayIntentBits } = require("discord.js");

const fs = require("node:fs");

//init client
const client = new Client({ intents: GatewayIntentBits.Guilds });

client.commands = new Collection();
client.commandArray = new Array();

const functionFolders = fs.readdirSync(`./src/functions`);
for (const folder of functionFolders) {
  const functionFiles = fs
    .readdirSync(`./src/functions/${folder}`)
    .filter((file) => file.endsWith(".js"));
	for(const file of functionFiles)
		require(`./functions/${folder}/${file}`)(client)
}

client.handleEvents();
client.handleCommands();

client.login(process.env.DISCORD_TOKEN); //login bot using token
