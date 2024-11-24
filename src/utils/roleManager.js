import { PermissionFlagsBits } from 'discord.js';

export async function setupRoles(guild, roleNames) {
  const roles = [];
  
  for (const roleName of roleNames) {
    let role = await findSimilarRole(guild, roleName);
    
    if (!role) {
      try {
        role = await guild.roles.create({
          name: roleName,
          permissions: [],
          reason: 'Rol creado automáticamente por el bot'
        });
        console.log(`Rol creado: ${roleName}`);
      } catch (error) {
        console.error(`Error al crear rol ${roleName}:`, error);
        continue;
      }
    }
    
    roles.push(role);
  }
  
  return roles;
}

export async function findSimilarRole(guild, roleName) {
  const roles = await guild.roles.fetch();
  return roles.find(role => 
    role.name.toLowerCase() === roleName.toLowerCase() ||
    role.name.toLowerCase().includes(roleName.toLowerCase())
  );
}

export async function setupModChannel(guild) {
  let channel = guild.channels.cache.find(c => 
    c.name.toLowerCase().includes('moderador') || 
    c.name.toLowerCase().includes('mod-logs')
  );
  
  if (!channel) {
    try {
      channel = await guild.channels.create({
        name: 'moderadores',
        type: 0, // GUILD_TEXT
        permissionOverwrites: [
          {
            id: guild.id,
            deny: [PermissionFlagsBits.ViewChannel],
          },
          {
            id: process.env.MODERATOR_ROLE_ID,
            allow: [PermissionFlagsBits.ViewChannel],
          },
        ],
      });
    } catch (error) {
      console.error('Error al crear canal de moderadores:', error);
      return null;
    }
  }
  
  return channel;
}