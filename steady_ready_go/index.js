import Http from 'http';
import Mongoose from 'mongoose';
import App from './app.js';
const port = 3000;

App.set('port', port);
Mongoose.set('debug', true);

const server = Http.createServer(App);

const shutdown = async () => {
  try {
    console.log("\nShutting down server...");
    server.close();
    console.log('Server closed.');
    console.log('Closing database connection...');
    await Mongoose.disconnect();
    console.log('Database connection closed.');
    process.exit(0);
  } catch (err) { throw err }
}

const start = async () => {
  try {
    console.log("Establishing connection to database...");
    await Mongoose.connect('mongodb://localhost:27017/steady_ready_go');
    console.log('Connected to database.');
    server.listen(port, '0.0.0.0', () => {
      console.log(`Steady, Ready, Go! listening on port ${port}.`);
    });
  } catch (err) { throw err }
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

start();
