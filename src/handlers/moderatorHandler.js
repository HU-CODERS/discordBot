import { EmbedBuilder } from 'discord.js';

export async function handleModeratorDecision(interaction) {
  const isApproved = interaction.customId.startsWith('approve_');
  const userId = interaction.customId.split('_')[1];
  
  try {
    const user = await interaction.client.users.fetch(userId);
    const guild = interaction.guild;
    const member = await guild.members.fetch(userId);

    if (!user || !member) {
      await interaction.reply({
        content: '❌ No se pudo encontrar al usuario.',
        ephemeral: true
      });
      return;
    }

    if (isApproved) {
      // Asignar roles por defecto
      const defaultRoles = ['Recluta', 'Aprobado'];
      for (const roleName of defaultRoles) {
        let role = guild.roles.cache.find(r => 
          r.name.toLowerCase() === roleName.toLowerCase() ||
          r.name.toLowerCase().includes(roleName.toLowerCase())
        );

        if (!role) {
          role = await guild.roles.create({
            name: roleName,
            reason: 'Rol automático para nuevos miembros'
          });
        }

        await member.roles.add(role);
      }

      // Mensaje de bienvenida
      const welcomeChannel = await interaction.client.channels.fetch(process.env.WELCOME_CHANNEL_ID);
      await welcomeChannel.send({
        content: `¡Bienvenido ${user} al Clan Ronin! 🎉\nTu postulación ha sido aprobada. Por favor, revisa los canales de información para conocer nuestras normas y procedimientos.`
      });
    } else {
      // Mensaje de rechazo
      const applicationsChannel = await interaction.client.channels.fetch(process.env.APPLICATIONS_CHANNEL_ID);
      await applicationsChannel.send({
        content: `${user} Lo sentimos, tu postulación ha sido denegada en esta ocasión.`,
        flags: ['EPHEMERAL']
      });
    }

    // Actualizar mensaje original
    await interaction.message.edit({
      content: `Postulación ${isApproved ? 'aprobada' : 'denegada'} por ${interaction.user.tag}`,
      components: []
    });

    await interaction.reply({
      content: `✅ Has ${isApproved ? 'aprobado' : 'denegado'} la postulación de ${user.tag}`,
      ephemeral: true
    });
  } catch (error) {
    console.error('Error al procesar decisión:', error);
    await interaction.reply({
      content: '❌ Hubo un error al procesar la decisión.',
      ephemeral: true
    });
  }
}