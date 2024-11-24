import { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } from 'discord.js';

export async function handleApplicationButton(interaction) {
  const modal = new ModalBuilder()
    .setCustomId('application_modal')
    .setTitle('Formulario de Aplicación');

  const steamIdInput = new TextInputBuilder()
    .setCustomId('steamid')
    .setLabel('Steam64 ID')
    .setStyle(TextInputStyle.Short)
    .setRequired(true);
    
  const edadInput = new TextInputBuilder()
    .setCustomId('edad')
    .setLabel('Edad')
    .setStyle(TextInputStyle.Short)
    .setRequired(true);

  const levelInput = new TextInputBuilder()
    .setCustomId('level')
    .setLabel('Nivel en HLL')
    .setStyle(TextInputStyle.Short)
    .setRequired(true);

  const headInput = new TextInputBuilder()
    .setCustomId('head')
    .setLabel('¿Tenes Headset con microfono?')
    .setStyle(TextInputStyle.Short)
    .setRequired(true);

  const activeInput = new TextInputBuilder()
    .setCustomId('active')
    .setLabel('¿Podes participar en practicas competitivas?')
    .setStyle(TextInputStyle.Short)
    .setRequired(true); 

  const rows = [steamIdInput, edadInput, headInput, activeInput, levelInput].map(
    input => new ActionRowBuilder().addComponents(input)
  );

  modal.addComponents(rows);
  await interaction.showModal(modal);
}