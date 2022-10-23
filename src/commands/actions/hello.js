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
        console.log(client)
        const newMessage = `hello ${interaction.user.username}`
        await interaction.editReply({
            content: newMessage
        })
    }
};
