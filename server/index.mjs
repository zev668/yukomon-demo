import { createApp } from './app.mjs';
const service = createApp();
const port = Number(process.env.PORT || 8787);
const server = service.app.listen(port, process.env.HOST || '127.0.0.1', () => console.log(`Yukomon 0.5.1: http://127.0.0.1:${port}`));
let shuttingDown = false;
function stop() { if (shuttingDown) return; shuttingDown = true; server.close(() => { service.close(); process.exit(0); }); setTimeout(() => process.exit(1), 10000).unref(); }
process.on('SIGINT', stop);
process.on('SIGTERM', stop);
