/**
 * Wraps websocket to common transport interface.
 * @version 0.1.0
 */
class Transport {

  constructor() {
  }

  /**
   * Send message directly to client.
   * @param type
   * @param payload
   */
  send(type, payload) {
    console.info('send', type, payload);
  }

  /**
   * Send message to all connected clients except of one connected to this transport.
   * @param type
   * @param payload
   */
  broadcast(type, payload) {
    console.info('broadcast', type, payload);
  }

  on(type, callback) {
    console.info('on', type, callback);
  }
}

export default Transport;
