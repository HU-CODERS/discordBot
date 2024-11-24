import { 
  ActionRowBuilder, 
  ButtonBuilder, 
  ButtonStyle, 
  EmbedBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle
} from 'discord.js';

export async function createApplicationForm(interaction, channelId = null) {
  if (!channelId) {
    const modal = new ModalBuilder()
      .setCustomId('form_channel_modal')
      .setTitle('Crear Formulario de Aplicación');

    const channelInput = new TextInputBuilder()
      .setCustomId('channel_id')
      .setLabel('ID del Canal')
      .setStyle(TextInputStyle.Short)
      .setPlaceholder('Ingresa el ID del canal donde crear el formulario')
      .setRequired(true);

    modal.addComponents(new ActionRowBuilder().addComponents(channelInput));
    await interaction.showModal(modal);
    return;
  }

  try {
    const channel = await interaction.guild.channels.fetch(channelId);
    if (!channel) {
      await interaction.reply({
        content: 'No se encontró el canal especificado.',
        ephemeral: true
      });
      return;
    }

    const embed = new EmbedBuilder()
      .setColor(0x0099FF)
      .setTitle('¿Queres formar parte de nuestro clan?')
      .setDescription('¡Estamos en la búsqueda de jugadores apasionados que valoren la organización, el respeto y que sepan seguir las directrices de sus líderes de escuadra. Para nosotros, el compañerismo y el trabajo en equipo son esenciales.!')
      .addFields(
        { name: '📋 Proceso', value: 'Completa el formulario y los reclutadores revisarán tu solicitud.' },
        { name: '⏱️ Tiempo', value: 'Solo te llevará 5 minutos a reloj.' }
      );

    const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId('solicitar_aplicacion')
          .setLabel('Aplicar')
          .setStyle(ButtonStyle.Primary)
          .setEmoji('📝')
      );

    await channel.send({
      embeds: [embed],
      components: [row]
    });

    await interaction.reply({
      content: `Formulario de aplicación creado exitosamente en <#${channelId}>`,
      ephemeral: true
    });
  } catch (error) {
    console.error('Error al crear formulario:', error);
    await interaction.reply({
      content: 'Hubo un error al crear el formulario de aplicación.',
      ephemeral: true
    });
  }
}