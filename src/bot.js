import { Client, GatewayIntentBits, Events, REST, Routes } from 'discord.js';
import dotenv from 'dotenv';
import { registerCommands } from './commands/register.js';
import { handleInteraction } from './handlers/interactionHandler.js';

dotenv.config();

export async function startBot() {
  const requiredEnvVars = [
    'DISCORD_TOKEN',
    'DISCORD_CLIENT_ID',
    'MODERATOR_ROLES',
    'FORM_ABLE',
    'RONIN_MEMBERS',
    'WELCOME_CHANNEL_ID',
    'APPLICATIONS_CHANNEL_ID',
    'MOD_CHANNEL_ID'
  ];

  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
      throw new Error(`Missing required environment variable: ${envVar}`);
    }
  }

  const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
      GatewayIntentBits.GuildMembers
    ],
  });

  const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

  client.once(Events.ClientReady, async (readyClient) => {
    console.log(`¡Listo! Conectado como ${readyClient.user.tag}`);
    
    // Enviar mensaje al canal de moderadores
    try {
      const modChannel = await client.channels.fetch(process.env.MOD_CHANNEL_ID);
      if (modChannel) {
        await modChannel.send({
          content: '🤖 Bot iniciado exitosamente.\n\nDesarrollado por Jorge Gallardo (justjorge)\nPara Clan Ronin - Hell Let Loose Latinoamérica\n\nVersión: 2.0.0'
        });
      }
    } catch (error) {
      console.error('Error al enviar mensaje de inicio:', error);
    }

    try {
      await registerCommands(rest, process.env.DISCORD_CLIENT_ID);
      console.log('Comandos slash registrados correctamente');
    } catch (error) {
      console.error('Error al registrar comandos slash:', error);
    }
  });

  client.on(Events.GuildCreate, async (guild) => {
    try {
      const modChannel = guild.channels.cache.get(process.env.MOD_CHANNEL_ID) || 
        await guild.channels.create({
          name: 'moderadores',
          type: 0,
          permissionOverwrites: [
            {
              id: guild.id,
              deny: ['ViewChannel'],
            },
            ...process.env.MODERATOR_ROLES.split(',').map(roleId => ({
              id: roleId,
              allow: ['ViewChannel'],
            }))
          ],
        });

      await modChannel.send({
        content: '👋 ¡Hola! Soy el bot oficial del Clan Ronin.\n\nEste canal será utilizado para gestionar las postulaciones y otras funciones administrativas.\n\nDesarrollado por HUCO (SGT. Mokka -REC-)\nPara Clan Ronin - Hell Let Loose Latinoamérica'
      });
    } catch (error) {
      console.error('Error al configurar canal de moderadores:', error);
    }
  });

  client.on(Events.InteractionCreate, handleInteraction);

  await client.login(process.env.DISCORD_TOKEN);
  return client;
}