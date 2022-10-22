const { SlashCommandBuilder } = require("discord.js");
const { execute } = require("../../events/client/ready");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("hello")
    .setDescription("testing command"),
    async execute (interaction, client){
        const message = await interaction.deferReply({
            fetchReply:   true
        });
        const newMessage = `yolooooooooooo`
        await interaction.editReply({
            content: newMessage
        })
    }
};
