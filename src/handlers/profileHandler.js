import { 
    ActionRowBuilder, 
    ButtonBuilder, 
    ButtonStyle, 
    EmbedBuilder 
  } from 'discord.js';
  import Fuse from 'fuse.js';
  import { teamMembers } from '../data/team.js';
  
  export async function handleProfileCommand(interaction) {
    const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId('profile_verify')
          .setLabel('Verificar Perfil Existente')
          .setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
          .setCustomId('profile_create')
          .setLabel('Crear Nuevo Perfil')
          .setStyle(ButtonStyle.Secondary)
      );
  
    await interaction.reply({
      content: '¿Qué deseas hacer con tu perfil?',
      components: [row],
      ephemeral: true
    });
  }
  
  export async function handleProfileButtons(interaction) {
    const action = interaction.customId.split('_')[1];
  
    if (action === 'verify') {
      const fuse = new Fuse(teamMembers.Members, {
        keys: ['name'],
        threshold: 0.4
      });
  
      const username = interaction.user.username;
      const results = fuse.search(username);
  
      if (results.length > 0) {
        const profile = results[0].item;
        const embed = new EmbedBuilder()
          .setColor(0x0099FF)
          .setTitle('Perfil Encontrado')
          .setDescription(`¿Este es tu perfil?`)
          .addFields(
            { name: 'Nombre', value: profile.name },
            { name: 'Rol', value: profile.role },
            { name: 'Fecha de Ingreso', value: profile.joinDate }
          );
  
        const row = new ActionRowBuilder()
          .addComponents(
            new ButtonBuilder()
              .setCustomId(`profile_confirm_${results[0].refIndex}`)
              .setLabel('Sí, es mi perfil')
              .setStyle(ButtonStyle.Success),
            new ButtonBuilder()
              .setCustomId('profile_next')
              .setLabel('No, buscar otro')
              .setStyle(ButtonStyle.Secondary)
          );
  
        await interaction.update({
          embeds: [embed],
          components: [row]
        });
      } else {
        await interaction.update({
          content: 'No se encontró ningún perfil similar. ¿Deseas crear uno nuevo?',
          components: [
            new ActionRowBuilder()
              .addComponents(
                new ButtonBuilder()
                  .setCustomId('profile_create')
                  .setLabel('Crear Nuevo Perfil')
                  .setStyle(ButtonStyle.Primary)
              )
          ]
        });
      }
    }
  }