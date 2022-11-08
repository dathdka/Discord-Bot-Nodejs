const { SlashCommandBuilder, escapeMarkdown } = require("discord.js");
const { execute } = require("../../events/client/ready");
const axios = require("axios");
const getFormula = (itemName) =>
  new Promise(async (resolve, reject) => {
    const data = { item: itemName };
    let res = await axios.post(
      "https://scraping-8v2x.onrender.com/api/craft",
      data
    );
    if (res) resolve(res.data);
    resolve(null);
  });

const getAllFormula = (itemName) =>
  new Promise(async (resolve, reject) => {
    const data = { material: itemName };
    let res = await axios.post(
      "https://scraping-8v2x.onrender.com/api/can-craft",
      data
    );
    if (res) resolve(res.data);
    resolve(null);
  });
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

const craft = async (interaction, itemName) => {
  await interaction.deferReply();
  const formula = await getFormula(itemName);
  if (formula) {
    const newString = stringBuilder(formula.map);
    const message = `\`\`\` ${newString}\n\`\`\``;
    console.log(message);
    await interaction
      .editReply({
        content: message,
      })
      .catch((err) => {});
  } else
    await interaction
      .editReply({
        content: "item does not exsist",
      })
      .catch((err) => {});
};



const canCrafting = async (interaction, itemName) => {
  await interaction.deferReply();
  const formulaList = await getAllFormula(itemName);
  var tempMessage = "";
  var canContinue
  for (var item in formulaList.map) {
    tempMessage += "\t" + item + "\n";
    const formula = stringBuilder(formulaList.map[item]) + `\n`;
    if(formula.length + tempMessage.length > 1900){
      canContinue = item
      break
    }
    tempMessage += formula;
  }
  const message = `\`\`\`\nAll items that can be craft by ${itemName}: \n${tempMessage} \n\`\`\``;
  console.log(message.length);
  if (message) {
    console.log("succeeded");
    await interaction
      .editReply({
        content: message,
      })
      .catch((err) => {});
  } else
    await interaction.editReply({
      content: "something went wrong",
    });
  return;
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName("craft")
    .setDescription("Get formula of that item")
    .addStringOption((option) =>
      option.setName("material").setDescription("Get all item can be crafted")
    )
    .addStringOption((option) =>
      option.setName("formula").setDescription("Get formula of item")
    ),
  async execute(interaction, client) {
    const getFormula = interaction.options.getString("formula");
    const getItem = interaction.options.getString("material");

    if (getFormula) {
      console.log("formula");
      await craft(interaction, getFormula);
    } else if (getItem) {
      console.log("material");
      await canCrafting(interaction, getItem);
    } else {
      console.log("unknown");
      await interaction
        .reply({
          content:
            "please use /commands to get all current active slash commands",
        })
        .catch((err) => {});
    }
  },
};
