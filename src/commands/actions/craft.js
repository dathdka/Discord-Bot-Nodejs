const { SlashCommandBuilder } = require("discord.js");
const { execute } = require("../../events/client/ready");
const axios = require("axios");
const stringBuilder = (materialArray) => {
  var string = "";
  for (var item of materialArray) {
    var tempString = "";
    tempString =
      tempString.padStart(item.class + 1, "\t\t") + "|___" + item.name + "\n";
    string += tempString;
  }
  return string;
};
module.exports = {
  data: new SlashCommandBuilder()
    .setName("craft")
    .setDescription("Get formula of that item")
    .addStringOption((option) =>
      option.setName("formula").setDescription("Get all item can be crafted")
    )
    .addStringOption((option) =>
      option.setName("craft").setDescription("Get formula of item")
    ),
  async execute(interaction, client) {
    const getFormula = (itemName) =>
      new Promise(async (resolve, reject) => {
        const data = { item: itemName };
        let res = await axios.post(
          "https://scraping-8v2x.onrender.com/api/craft",
          data
        );
        resolve(res.data);
      });
    const itemName = interaction.options.getString("craft");
    const formula = await getFormula(itemName);
    console.log(formula.map);
    const newString = stringBuilder(formula.map);
    const message = `\`\`\` ${newString}\n\`\`\``;
    console.log(message);
    await interaction.reply({
      content: message,
    });
  },
};
