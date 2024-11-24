import { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';

export async function handleApplicationSubmit(interaction) {
  const fields = {
    steamid: interaction.fields.getTextInputValue('steamid'),
    edad: interaction.fields.getTextInputValue('edad'),
    level: interaction.fields.getTextInputValue('level'),
    head: interaction.fields.getTextInputValue('head'),
    active: interaction.fields.getTextInputValue('active')
  };

  // Crear embed para moderadores
  const modEmbed = new EmbedBuilder()
    .setColor(0x0099FF)
    .setTitle('Nueva Postulación')
    .addFields(
      { name: 'Usuario', value: `${interaction.user.tag} (${interaction.user.id})` },
      { name: 'Steam ID', value: fields.steamid },
      { name: 'Edad', value: fields.edad },
      { name: 'Nivel en HLL', value: fields.level },
      { name: 'Headset', value: fields.head },
      { name: 'Disponibilidad', value: fields.active }
    )
    .setTimestamp();

  // Botones de aprobación/rechazo
  const buttons = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setCustomId(`approve_${interaction.user.id}`)
        .setLabel('Aprobar')
        .setStyle(ButtonStyle.Success),
      new ButtonBuilder()
        .setCustomId(`deny_${interaction.user.id}`)
        .setLabel('Denegar')
        .setStyle(ButtonStyle.Danger)
    );

  // Enviar a canal de moderadores
  const channel = await interaction.client.channels.fetch(process.env.APPLICATIONS_CHANNEL_ID);
  await channel.send({ embeds: [modEmbed], components: [buttons] });

  // Confirmar al usuario
  await interaction.reply({
    content: '✅ Tu postulación ha sido enviada correctamente. Te notificaremos el resultado en el canal de postulaciones.',
    ephemeral: true
  });
}