const Discord = require("discord.js")
const config = require("../../../config.json")
const client = require("../../..")

module.exports = function async(interaction, category, emoji) {
        if (interaction.guild.channels.cache.some(ch => ch.name.endsWith(`-${interaction.user.id}`))) return interaction.reply({ content: ":x: Você já possui um ticket aberto!", ephemeral: true });
        interaction.guild.channels.create({
            name: `${emoji}・${category}-${interaction.user.id}`,
            type: Discord.ChannelType.GuildText,
            parent: `${config.options.categoria}`,

            permissionOverwrites: [
                {
                    id: `${interaction.user.id}`,
                    allow: ["ViewChannel", "SendMessages"]
                },
                {
                    id: interaction.guild.roles.everyone.id,
                    deny: ["ViewChannel", "SendMessages"]
                }
            ]
        }).then(res => {
            interaction.reply({ content: `Seu ticket foi criado com sucesso: <#${res.id}>`, ephemeral: true })
            const channelLogs = interaction.guild.channels.cache.get(config.options.logsChannel)

            let content
            config.options.mencionarAdmin ? `${content = `<@&${config.options.adminRole}>`}` : ""

            let desc = `${config.ticketDescOptions[category].description}`

            const embed = new Discord.EmbedBuilder()
            .setTitle(`${interaction.guild.name}'s Ticket`)
            .setDescription(desc.replace(`{user}`, interaction.user))
            .setColor(config.ticketDescOptions[category].color)
            .setThumbnail(interaction.user.avatarURL({ dynamic: true }))
            .setFooter({ text: interaction.guild.name })

            const buttons = new Discord.ActionRowBuilder().addComponents(
                new Discord.ButtonBuilder()
                .setCustomId("delete_ticket")
                .setLabel("Deletar")
                .setEmoji("🗑")
                .setStyle(Discord.ButtonStyle.Secondary),

                new Discord.ButtonBuilder()
                .setCustomId("close")
                .setLabel("Fechar Ticket")
                .setEmoji(`🚫`)
                .setStyle(Discord.ButtonStyle.Secondary)
            )

            channelLogs.send({
                embeds: [
                    new Discord.EmbedBuilder()
                    .setTitle("Logs System - Ticket")
                    .setDescription(`
                    :satellite: Um novo ticket foi aberto!

                    :pencil: **Informações:**
                    > :timer: Aberto <t:${Math.floor(Date.now() / 1000 )}:R>
                    > ${emoji} Categoria: ${category}
                    > :identification_card: Usúario: ${interaction.user} - ${interaction.user.id}
                    > :bell: Canal do ticket: <#${res.id}>
                    `)
                    .setColor("Fuchsia")
                ]
            })

            res.send({
                content: content,
                embeds: [embed],
                components: [buttons]
            })
        })
}