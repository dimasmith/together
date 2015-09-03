/**
 * Application configuration
 */

const host = process.env.SERVER_HOST || 'localhost'; // host name for server
const port = process.env.SERVER_PORT || 8000; // server port
const development = process.env.NODE_ENV !== 'production'; // should run in development mode
const proxyPort = process.env.DEV_SERVER_PORT || 9000; // development proxy port (webpack dev server)
const webSocketAddress = 'http://' + host + ':' + port;

module.exports = {
  host: host,
  port: port,
  development: development,
  proxyPort: proxyPort,
  webSocketAddress: webSocketAddress,
};
