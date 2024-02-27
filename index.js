const Discord = require("discord.js");
const Config = require("./config.json");
const Color = require("colors");

const client = new Discord.Client({
  intents: [
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.GuildInvites,
    Discord.GatewayIntentBits.GuildMembers,
    Discord.GatewayIntentBits.MessageContent,
    Discord.GatewayIntentBits.GuildMessages,
  ],
  partials: [
    Discord.Partials.GuildMember,
    Discord.Partials.Message,
    Discord.Partials.User,
  ],
});
module.exports = client;

client.on("interactionCreate", (interaction) => {
  if (interaction.type === Discord.InteractionType.ApplicationCommand) {
    const cmd = client.slashCommands.get(interaction.commandName);
    if (!cmd)
      return interaction.reply({
        content: `:x: Algo deu muito errado, tente novamente!`,
        ephemeral: true,
      });
    interaction["member"] = interaction.guild.members.cache.get(
      interaction.user.id
    );
    cmd.run(interaction, client);
  }
});

client.on("ready", () => {
  console.log(
    ` INFO `.bgMagenta,
    `Estou online em`,
    `${client.user.username}`.bold
  );
});

client.on("ready", () => {
  let activities = [
      `😎 Estou sendo desenvolvida pelo @krostalt`,
      `🎁 Estou preparando um presentãaaao para você!`,
    ],
    i = 0;
  setInterval(
    () =>
      client.user.setActivity(`${activities[Math.floor(Math.random() * activities.length)]}`, {type: 'PLAYING'}),
    10000
  );
  client.user.setStatus("idle");
});

client.slashCommands = new Discord.Collection();
const events = require("./events")(client);
const ticketIndex = require("./events/ticket")
const ticketButtons = require("./events/ticket/buttons")

client.login(Config.token);