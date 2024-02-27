const Discord = require("discord.js")
const config = require("../../config.json")

const { adminRole, mencionarAdmin } = config.options

module.exports = {
    name: "setup",
    description: "Envie meu painel de ticket para o canal!",
    type: Discord.ApplicationCommandType.ChatInput,

    run: async(interaction, client) => {
        const embed = new Discord.EmbedBuilder()
        .setTitle(`${interaction.guild.name}'s Ticket`)
        .setDescription(`
        📝 **Seja bem-vindo(a) ao nosso painel de ticket**, aqui você pode denunciar, receber ajuda, e outros, selecionando uma categoria abaixo!

        :satellite: **Avisos:**
        > Abrir ticket atoa pode resultar em banimentos!
        > Se você abrir ticket fora do horário de atendimento, terá que esperar os horários!

        ⏲️ **Horário de atendimento:**
        > Segunda a Sábado: \`08:00 - 18:00\`
        > Domingo e Feriados: \`10:00 - 13:00\`
        `)
        .setColor("Fuchsia")
        .setFooter({ text: `${interaction.guild.name}`, iconURL: interaction.guild.iconURL({ dynamic: true }) || interaction.user.avatarURL({ dynamic: true }) })
    
        const SelectMenuBuilder = new Discord.StringSelectMenuBuilder()
        .setCustomId("open_ticket")
        .setPlaceholder("Escolha uma categoria para abrir ticket!")
        .addOptions()
        
        config.selectOptions.forEach(item => {
            SelectMenuBuilder.addOptions(
                { label: item.label, description: item.description, emoji: item.emoji, value: item.value }
            )
        })

        interaction.reply({
            content: "O painel foi enviado com sucesso!",
            ephemeral: true
        })

        interaction.channel.send({
            embeds: [embed],
            components: [new Discord.ActionRowBuilder().addComponents(SelectMenuBuilder)]
        })
    }
}