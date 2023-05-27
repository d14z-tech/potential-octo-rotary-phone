import { shutdown, start } from "./src/handlers/index.js";

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

start();
