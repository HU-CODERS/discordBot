import { 
    ActionRowBuilder, 
    ButtonBuilder, 
    ButtonStyle, 
    EmbedBuilder 
  } from 'discord.js';
  
  export async function handleSetupCommand(interaction) {
    try {
      const embed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle('¿Quieres formar parte de nuestro clan?')
        .setDescription('¡Estamos en búsqueda de jugadores apasionados que valoren la organización, el respeto y que sepan seguir las directrices de sus líderes de escuadra!')
        .addFields(
          { name: '📋 Proceso', value: 'Completa el formulario y los reclutadores revisarán tu solicitud.' },
          { name: '⏱️ Tiempo', value: 'Solo te llevará 5 minutos.' }
        );
  
      const row = new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
            .setCustomId('apply_form')
            .setLabel('Postularme')
            .setStyle(ButtonStyle.Primary)
            .setEmoji('📝')
        );
  
      await interaction.channel.send({
        embeds: [embed],
        components: [row]
      });
  
      await interaction.reply({
        content: '✅ Formulario de postulación creado exitosamente.',
        ephemeral: true
      });
    } catch (error) {
      console.error('Error al crear formulario:', error);
      await interaction.reply({
        content: '❌ Hubo un error al crear el formulario.',
        ephemeral: true
      });
    }
  }