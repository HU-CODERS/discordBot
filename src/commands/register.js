import { SlashCommandBuilder, Routes } from 'discord.js';

const commands = [
  new SlashCommandBuilder()
    .setName('setup')
    .setDescription('Crea el formulario de postulación en este canal')
    .toJSON(),
  new SlashCommandBuilder()
    .setName('profile')
    .setDescription('Gestiona tu perfil de equipo')
    .toJSON(),
  new SlashCommandBuilder()
    .setName('myprofile')
    .setDescription('Ver tu perfil actual')
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