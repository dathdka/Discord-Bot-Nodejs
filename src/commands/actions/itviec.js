const { SlashCommandBuilder } = require("discord.js");
const { execute } = require("../../events/client/ready");
const https = require("node:https");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("itviec")
    .setDescription("get all data scraping from itviec"),
  async execute(interaction, client) {
    var dataToDisplay = {};
    await https.get(
      "https://scraping-8v2x.onrender.com/api/itviec",
       (res) => {
        let rawData = "";
        
         res.on("data", (chunk) => {
          rawData += chunk;
        });
        res.on("end",async () => {
           var parsedData = JSON.parse(rawData).framework;
           const sortedArray = parsedData.sort((p1,p2) => {
               return p1.quantity > p2.quantity ? -1 : 1
           })
           dataToDisplay["skill"] = sortedArray[0].skill
           dataToDisplay["quantity"] = sortedArray[0].quantity
           await interaction.reply({
             content: `hostest framework : ${dataToDisplay.skill} --- ${dataToDisplay.quantity} jobs`,
           });
        });
      }
    );
  },
};
