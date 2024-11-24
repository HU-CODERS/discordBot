import cron from 'node-cron';

export function watchdog(startFunction) {
  let client = null;

  async function start() {
    try {
      client = await startFunction();
    } catch (error) {
      console.error('Error starting bot:', error);
      setTimeout(start, 5000);
    }
  }

  // Iniciar el bot
  start();

  // Verificar estado cada 5 minutos
  cron.schedule('*/5 * * * *', async () => {
    if (!client?.isReady()) {
      console.log('Bot desconectado, reiniciando...');
      await start();
    }
  });

  // Manejar errores no capturados
  process.on('uncaughtException', (error) => {
    console.error('Error no capturado:', error);
    start();
  });

  process.on('unhandledRejection', (error) => {
    console.error('Promesa rechazada no manejada:', error);
    start();
  });
}