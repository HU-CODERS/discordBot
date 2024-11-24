import { watchdog } from './utils/watchdog.js';
import { startBot } from './bot.js';

watchdog(() => startBot());