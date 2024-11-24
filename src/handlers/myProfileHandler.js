import { EmbedBuilder } from 'discord.js';
import { teamMembers } from '../data/team.js';

export async function handleMyProfileCommand(interaction) {
  const member = teamMembers.Members.find(m => m.discordId === interaction.user.id);

  if (!member) {
    await interaction.reply({
      content: '❌ No se encontró tu perfil. Usa `/profile` para crear o verificar tu perfil.',
      ephemeral: true
    });
    return;
  }

  const embed = new EmbedBuilder()
    .setColor(0x0099FF)
    .setTitle(`Perfil de ${member.name}`)
    .setThumbnail(member.avatar)
    .addFields(
      { name: 'Rol', value: member.role },
      { name: 'Fecha de Ingreso', value: member.joinDate },
      { name: 'Roles de Juego', value: member.labels.length > 0 ? member.labels.join(', ') : 'No especificado' },
      { name: 'Descripción', value: member.description || 'No especificada' },
      { name: '¿Por qué Ronin?', value: member.whyRonin || 'No especificado' }
    );

  if (member.socials.some(s => s.url)) {
    embed.addField('Redes Sociales', member.socials
      .filter(s => s.url)
      .map(s => `[${s.name}](${s.url})`)
      .join(' | ')
    );
  }

  await interaction.reply({
    embeds: [embed],
    ephemeral: true
  });
}