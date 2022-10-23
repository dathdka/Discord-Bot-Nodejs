const { SlashCommandBuilder } = require("discord.js");
const { execute } = require("../../events/client/ready");
const fs = require('node:fs')

module.exports = {
  data: new SlashCommandBuilder()
    .setName("commands")
    .setDescription("get all commands"),
    async execute (interaction, client) {
        const commandList = fs.readdirSync('./src/commands/actions').map((file) =>{
            return file.replace('.js', '')
        })
        console.log(commandList)
        interaction.reply({
            content: commandList.toString()
        })
    }
};
