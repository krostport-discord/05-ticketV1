const Discord = require("discord.js")
const config = require("../../config.json")
const createChannel = require("./functions/createChannelTicket")
const client = require("../..");

client.on("interactionCreate", (interaction) => {
    if (interaction.isStringSelectMenu()) {
        switch (interaction.values[0]) {
            case "denuncia":
                createChannel(interaction, "denuncia", "🚫")
                break;
            
            case "suporte":
                createChannel(interaction, "suporte", "📝")
                break
            
            case "outros":
                createChannel(interaction, "outros", "📡")
                break
            default:
                interaction.reply("default")
                break;
        }
    }
})