import { EmbedBuilder } from 'discord.js';

export async function showHelpMenu(interaction) {
  const embed = new EmbedBuilder()
    .setColor(0x0099FF)
    .setTitle('📚 Ayuda del Bot')
    .setDescription('Guía de comandos y funcionalidades')
    .addFields(
      { 
        name: 'Comandos Disponibles',
        value: '`/menu` o `!menu` - Abre el menú principal'
      },
      {
        name: 'Funcionalidades para Usuarios',
        value: '• Solicitar Aplicación - Completa un formulario para unirte\n• Ver Ayuda - Muestra este menú de ayuda'
      },
      {
        name: 'Funcionalidades para Moderadores',
        value: '• Crear Formulario - Crea un botón de aplicación en un canal\n• Aprobar/Denegar Solicitudes\n• Asignar Roles Personalizados'
      },
      {
        name: 'Notas',
        value: '• Las solicitudes se envían al canal de moderadores\n• Los moderadores pueden usar mensajes personalizados\n• Los roles se crean automáticamente si no existen'
      }
    );

  await interaction.reply({
    embeds: [embed],
    ephemeral: true
  });
}