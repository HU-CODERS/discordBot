import { handleSetupCommand } from './setupHandler.js';
import { handleProfileCommand, handleProfileButtons } from './profileHandler.js';
import { handleMyProfileCommand } from './myProfileHandler.js';
import { handleApplicationSubmit } from './submitHandler.js';
import { handleModeratorDecision } from './moderatorHandler.js';

export async function handleInteraction(interaction) {
  try {
    if (interaction.isChatInputCommand()) {
      switch (interaction.commandName) {
        case 'setup':
          // Verificar si el usuario tiene rol de moderador
          const hasModRole = interaction.member.roles.cache.some(role => 
            process.env.MODERATOR_ROLES.split(',').includes(role.id)
          );
          
          if (!hasModRole) {
            await interaction.reply({
              content: '❌ No tienes permisos para usar este comando.',
              ephemeral: true
            });
            return;
          }
          
          await handleSetupCommand(interaction);
          break;
          
        case 'profile':
          // Verificar si el usuario tiene rol de miembro
          const hasMemberRole = interaction.member.roles.cache.some(role => 
            process.env.RONIN_MEMBERS.split(',').includes(role.id)
          );
          
          if (!hasMemberRole) {
            await interaction.reply({
              content: '❌ Este comando es solo para miembros del clan.',
              ephemeral: true
            });
            return;
          }
          
          await handleProfileCommand(interaction);
          break;
          
        case 'myprofile':
          await handleMyProfileCommand(interaction);
          break;
      }
    } 
    else if (interaction.isButton()) {
      if (interaction.customId.startsWith('profile_')) {
        await handleProfileButtons(interaction);
      }
      else if (interaction.customId.startsWith('approve_') || interaction.customId.startsWith('deny_')) {
        const hasModRole = interaction.member.roles.cache.some(role => 
          process.env.MODERATOR_ROLES.split(',').includes(role.id)
        );
        
        if (!hasModRole) {
          await interaction.reply({
            content: '❌ No tienes permisos para esta acción.',
            ephemeral: true
          });
          return;
        }
        
        await handleModeratorDecision(interaction);
      }
    }
    else if (interaction.isModalSubmit()) {
      if (interaction.customId === 'application_modal') {
        // Verificar si el usuario tiene roles que no pueden aplicar
        const cannotApply = interaction.member.roles.cache.some(role => 
          process.env.FORM_ABLE.split(',').includes(role.id)
        );
        
        if (cannotApply) {
          await interaction.reply({
            content: '❌ No puedes enviar una postulación con tu rol actual.',
            ephemeral: true
          });
          return;
        }
        
        await handleApplicationSubmit(interaction);
      }
    }
  } catch (error) {
    console.error('Error en interacción:', error);
    try {
      const reply = {
        content: 'Hubo un error al procesar tu interacción.',
        ephemeral: true
      };
      
      if (interaction.deferred || interaction.replied) {
        await interaction.followUp(reply);
      } else {
        await interaction.reply(reply);
      }
    } catch (err) {
      console.error('Error al enviar mensaje de error:', err);
    }
  }
}