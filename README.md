# Bot de Discord - Clan Ronin

Bot oficial del Clan Ronin para Hell Let Loose Latinoamérica.

## Guía de Instalación Paso a Paso

### 1. Requisitos Previos

#### Instalar Node.js
1. Visita [nodejs.org](https://nodejs.org/)
2. Descarga la versión LTS (recomendada para la mayoría de usuarios)
3. Ejecuta el instalador:
   - Haz clic en "Siguiente" en todas las opciones
   - Marca la casilla que dice "Automatically install the necessary tools..."
4. Para verificar la instalación:
   - Abre el Command Prompt (CMD) o Terminal
   - Escribe: `node --version`
   - Si ves un número de versión (ej: v18.17.0), ¡la instalación fue exitosa!

### 2. Descargar el Proyecto

#### Usando Git (Recomendado):
1. Instala [Git](https://git-scm.com/downloads)
2. Abre el CMD o Terminal
3. Navega a la carpeta donde quieres el proyecto:
   ```bash
   cd C:\MisCarpetas\MisProyectos
   ```
4. Clona el repositorio:
   ```bash
   git clone https://github.com/HU-CODERS/discordBot
   ```

#### Sin Git:
1. Descarga el proyecto como ZIP
2. Descomprime en la carpeta deseada

### 3. Configuración del Proyecto

1. Abre el CMD o Terminal
2. Navega a la carpeta del proyecto:
   ```bash
   cd ruta/al/proyecto
   ```
3. Instala las dependencias:
   ```bash
   npm install
   ```

### 4. Configurar Variables de Entorno

1. Crea una copia del archivo `.env.example` y renómbralo a `.env`
2. Abre el archivo `.env` con el Bloc de Notas
3. Completa los siguientes valores:

```env
DISCORD_TOKEN=           # Token del bot
DISCORD_CLIENT_ID=       # ID de la aplicación
MODERATOR_ROLES=         # IDs de roles de moderador (separados por coma)
FORM_ABLE=              # IDs de roles que no pueden postular
RONIN_MEMBERS=          # IDs de roles de miembros
WELCOME_CHANNEL_ID=      # ID del canal de bienvenida
APPLICATIONS_CHANNEL_ID= # ID del canal de postulaciones
MOD_CHANNEL_ID=         # ID del canal de moderadores
```

#### ¿Dónde encontrar estos valores?

1. **Crear una Aplicación en Discord**:
   - Ve a [Discord Developer Portal](https://discord.com/developers/applications)
   - Haz clic en "New Application"
   - Dale un nombre (ej: "Bot Ronin")
   - Ve a la sección "Bot"
   - Haz clic en "Reset Token" y copia el token
   - Este es tu `DISCORD_TOKEN`
   - El `DISCORD_CLIENT_ID` está en la sección "General Information"

2. **IDs de Roles y Canales**:
   - En Discord, activa el "Modo Desarrollador":
     - Configuración de Usuario → Avanzado → Modo Desarrollador
   - Para obtener IDs:
     - Roles: Clic derecho en el rol → Copiar ID
     - Canales: Clic derecho en el canal → Copiar ID

### 5. Iniciar el Bot

1. En el CMD o Terminal, dentro de la carpeta del proyecto:
   ```bash
   npm run dev
   ```
2. Deberías ver el mensaje "Bot iniciado exitosamente"

### 6. Invitar el Bot al Servidor

1. Ve al [Discord Developer Portal](https://discord.com/developers/applications)
2. Selecciona tu aplicación
3. Ve a "OAuth2" → "URL Generator"
4. Marca los siguientes scopes:
   - `bot`
   - `applications.commands`
5. En "Bot Permissions" marca:
   - Administrator
6. Copia la URL generada
7. Pégala en tu navegador
8. Selecciona tu servidor
9. Confirma la invitación

## Comandos Disponibles

- `/setup` - (Solo moderadores) Crea el formulario de postulación
- `/profile` - (Solo miembros) Gestiona tu perfil
- `/myprofile` - Ver tu perfil actual

## Soporte

Si tienes problemas:
1. Verifica que todos los pasos se siguieron correctamente
2. Revisa que los valores en `.env` sean correctos
3. Asegúrate de que el bot tenga los permisos necesarios
4. Contacta a SGT. Mokka en Discord para soporte adicional

## Notas Importantes

- Mantén seguro tu `DISCORD_TOKEN`. Si se filtra, regenera uno nuevo inmediatamente
- El bot necesita permisos de administrador para funcionar correctamente
- Asegúrate de que los roles y canales existan antes de configurar sus IDs
- Recomendamos mantener una copia de seguridad del archivo `.env`
 
## Créditos

Desarrollado por Bruno Buonassisa (SGT. Mokka)
Para Clan Ronin - Hell Let Loose Latinoamérica
