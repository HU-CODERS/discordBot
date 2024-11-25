import { SlashCommandBuilder, Routes } from 'discord.js';

const commands = [
  new SlashCommandBuilder()
    .setName('setup')
    .setDescription('Crea el formulario de postulación en este canal')
    .toJSON()
];

export async function registerCommands(rest, clientId) {
  try {
    await rest.put(
      Routes.applicationCommands(clientId),
      { body: commands }
    );
  } catch (error) {
    console.error('Error registrando comandos:', error);
    throw error;
  }
}