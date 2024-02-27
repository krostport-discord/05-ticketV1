const Discord = require("discord.js")
const config = require("../../../config.json")
const client = require("../../..")
const transcript = require("discord-html-transcripts")

client.on("interactionCreate", async(interaction) => {

    const channelLogs = interaction.guild.channels.cache.get(`${config.options.logsChannel}`)

    if(interaction.isButton()) {
        switch (interaction.customId) {
            case "delete_ticket":
                if(!interaction.memberPermissions.has(32)) return interaction.reply({ content: ":x: Você não tem permissão para usar este botão!", ephemeral: true })

                const transcriptAtt = await transcript.createTranscript(interaction.channel, {
                    filename: "byKrost-transcript.html",
                    saveImages: true,
                    footerText: "{number} mensagen{s} foram exportadas para o transcript | Bot criado por @krostalt",
                    poweredBy: false,
                    returnType: "attachment"
                })

                interaction.reply(`O canal será excluido <t:${Math.floor(Date.now() / 1000 + 15)}:R>`)

                setTimeout(() => {
                    interaction.channel.delete()
                }, 15000);
                
                channelLogs.send({
                    embeds: [
                        new Discord.EmbedBuilder()
                        .setTitle("Logs System - Ticket")
                        .setColor("Fuchsia")
                        .setDescription(`
                        :satellite: Um ticket foi deletado
    
                        :pencil: **Informações:**
                        > :timer: Deletado <t:${Math.floor(Date.now() / 1000 )}:R>
                        > :identification_card: Staff que deletou: ${interaction.user} - ${interaction.user.id}
                        > :identification_card: Dono do ticket: <@${String(interaction.channel.name).split("-")[1]}>
                        `)
                    ],  
                    files: [transcriptAtt]
                })
                break;

                case "close":
                    interaction.channel.permissionOverwrites.edit(String(interaction.channel.name).split("-")[1], { SendMessages: false, ViewChannel: false })
                    interaction.reply(`O canal foi bloqueado com sucesso!`)

                    channelLogs.send({
                        embeds: [
                            new Discord.EmbedBuilder()
                            .setTitle("Logs System - Ticket")
                            .setColor("Fuchsia")
                            .setDescription(`
                            :satellite: Um ticket foi bloqueado!
        
                            :pencil: **Informações:**
                            > :timer: Bloqueado <t:${Math.floor(Date.now() / 1000 )}:R>
                            > :identification_card: Staff que bloqueou: ${interaction.user} - ${interaction.user.id}
                            > :identification_card: Dono do ticket: <@${String(interaction.channel.name).split("-")[1]}>
                            `)
                        ],  
                    })

                    const user = interaction.guild.members.cache.get(String(interaction.channel.name).split("-")[1])
                    user.send(`${user} Seu ticket foi bloqueado por ${interaction.user}, mas fique atento, pois ele pode ser reaberto!`)
                    break
        
            default:
                break;
        }
    }
})