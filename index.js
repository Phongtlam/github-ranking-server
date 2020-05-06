const app = require('./app');
const server = require('http').createServer(app);

const HOSTNAME = process.env.HOSTNAME || '127.0.0.1';
const PORT = process.env.PORT || 3000;

server.listen(PORT, HOSTNAME, () => {
  console.log(`Github rank is listening at http://${HOSTNAME}:${PORT}/!`);
});
