import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } from 'discord.js';

export async function createMainMenu(interaction) {
  const embed = new EmbedBuilder()
    .setColor(0x0099FF)
    .setTitle('🤖 Menú Principal')
    .setDescription('Selecciona una opción:')
    .addFields(
      { name: '📝 Formulario', value: 'Crear o solicitar un formulario de aplicación' },
      { name: '❓ Ayuda', value: 'Muestra información sobre los comandos disponibles' }
    );

  const row = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setCustomId('crear_formulario')
        .setLabel('Crear Formulario')
        .setStyle(ButtonStyle.Primary)
        .setEmoji('📝'),
      new ButtonBuilder()
        .setCustomId('solicitar_aplicacion')
        .setLabel('Solicitar Aplicación')
        .setStyle(ButtonStyle.Secondary)
        .setEmoji('📋'),
      new ButtonBuilder()
        .setCustomId('ayuda')
        .setLabel('Ayuda')
        .setStyle(ButtonStyle.Secondary)
        .setEmoji('❓')
    );

  const reply = { embeds: [embed], components: [row], ephemeral: true };
  
  if (interaction.isChatInputCommand || interaction.isMessage) {
    await interaction.reply(reply);
  } else {
    await interaction.update(reply);
  }
}