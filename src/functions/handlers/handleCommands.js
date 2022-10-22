const fs = require("node:fs");
const {REST} = require('@discordjs/rest')
const {Routes} = require('discord-api-types/v9')

module.exports = (client) => {
  client.handleCommands = async () => {
    const commandsFolders = fs.readdirSync("./src/commands");
    const {commands, commandArray} = client;
    for (const folder of commandsFolders) {
      const commandFiles = fs
        .readdirSync(`./src/commands/${folder}`)
        .filter((file) => file.endsWith(".js"));
        for(const file of commandFiles){
            const command = require(`../../commands/${folder}/${file}`)
            commands.set(command.data.name, command )
            commandArray.push(command.data.toJSON())
        }
    }
    const clientId = '1032933517396545607'
    const guildId = '726060597535309934'
    const rest = new REST({version : 9}).setToken(process.env.DISCORD_TOKEN)
    try {
      console.log(`Started refreshing application (/) commands`)
      await rest.put(Routes.applicationGuildCommands(clientId, guildId),{
        body: commandArray
      })
      console.log('Successfully reloaded application (/) commands')
    } catch (error) {
      console.log(error)
    }
  };
};
