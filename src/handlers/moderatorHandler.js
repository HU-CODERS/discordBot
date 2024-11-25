import { EmbedBuilder, MessageFlags } from 'discord.js';

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
      // Asignar rol de Recluta
      const recruitRoleId = process.env.RECRUIT_ROLE_ID;
      try {
        await member.roles.add(recruitRoleId);
      } catch (error) {
        console.error('Error al asignar rol:', error);
        await interaction.reply({
          content: '❌ Error al asignar el rol de recluta.',
          ephemeral: true
        });
        return;
      }

      // Mensaje de bienvenida
      const welcomeChannel = await interaction.client.channels.fetch(process.env.WELCOME_CHANNEL_ID);
      if (welcomeChannel) {
        await welcomeChannel.send({
          content: `${user}\n\nBienvenido recluta!! Nos alegra que hayas podido alistarte en Ronin. Ahora comenzarás a ser observado y portarás en tu nombre de steam la insignia -🆁ec-\n\nUnase al Discord para poder conocerlo y acompañarlo en este largo camino de Hell Let Loose. Esto es un clan competitivo y se le va a exigir 101% soldado.\n\nEl Discord puede parecer un poco confuso al principio, por lo que comience por mutear la mayoría de canales a excepción de ⁠#eventos y el #bar-recluta Este canal será donde podrás comunicarte e interactuar con el resto de la comunidad. Si quieres participar de los eventos contra otros clanes deberás confirmar con el ✅ estará dentro del sistema y como potencial jugador en la alineación.\n\nSaludos y nos vemos en el campo de batalla. Suba sus stats a: ⁠#stats lo antes posible.`
        });
      }
    } else {
      const rejectionMessage = `Hola soldado! Nos alegra verte con ganas de formar parte del clan. Pero para formar parte de nuestras filas necesitaras demostrar tu valor en el campo de batalla. Unete al servidor "Hagamos Garris Latinoamérica" y dá lo mejor de ti, los Ronins te estaremos observando y evaluando. Báncate las caídas, arma los garrys, los nodos y encuentra tu clase favorita y mata muchos enemigos!! Y solo cuando llegues a lvl 80 volverás a postularte y ahí si podremos darte una respuesta.\n\nSeguinos en las redes sociales y andá llenandote de hype, porque cuando vuelvas a postularte tendremos tu insignia esperándote.\n🫡  A JUGAR!`;
      // Intento de envío de mensaje privado
      try {
        await user.send(rejectionMessage);
      } catch (error) {
        // Si falla el DM, intentar enviar mensaje en el canal de postulaciones
        const applicationsChannel = await interaction.client.channels.fetch(process.env.APPLICATIONS_CHANNEL_ID);
        if (applicationsChannel) {
          try {
            await applicationsChannel.send({
              content: `${user}\n\n${rejectionMessage}`,
              ephemeral: true
            });
          } catch (channelError) {
            console.error('Error al enviar mensaje de rechazo:', channelError);
          }
        }
      }
    }

    // Actualizar mensaje original
    try {
      await interaction.message.edit({
        content: `Postulación ${isApproved ? 'aprobada' : 'denegada'} por ${interaction.user.tag}`,
        components: []
      });
    } catch (error) {
      console.error('Error al actualizar mensaje:', error);
    }

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