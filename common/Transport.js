/**
 * Wraps websocket to common transport interface.
 * @version 0.1.0
 */
class Transport {

  constructor() {
  }

  /**
   * Send message directly to client.
   * @param {string} type
   * @param {Object} payload
   */
  send(type, payload) {
    console.info('send', type, payload);
  }

  /**
   * Send message to all connected clients except of one connected to this transport.
   * @param {string} type
   * @param {Object} payload
   */
  broadcast(type, payload) {
    console.info('broadcast', type, payload);
  }

  /**
   * @callback transportCallback
   * @param {Object} data object containing action payload
   */

  /**
   * Listen to incoming message of type and execute callback.
   * @param {string} type
   * @param {transportCallback} callback
   */
  on(type, callback) {
    console.info('on', type, callback);
  }
}

export default Transport;
