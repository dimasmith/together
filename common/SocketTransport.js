import Transport from './Transport.js';

const DEFAULT_SERIALIZER = {
  serialize(payload) {
    return JSON.stringify(payload);
  },

  parse(payload) {
    if (payload) {
      return JSON.parse(payload);
    }

    return {};
  },
};

/**
 * Wraps websocket to common transport interface.
 * @version 0.1.0
 */
class WebsocketTransport extends Transport {

  constructor(socket, serializer = DEFAULT_SERIALIZER) {
    super();
    this.transport = socket;
    this.serializer = serializer;
  }

  /**
   * Send message directly to client.
   * @param {string} type
   * @param {Object} payload
   */
  send(type, payload) {
    this.transport.emit(type, this.serializer.serialize(payload));
  }

  /**
   * Send message to all connected clients except of one connected to this transport.
   * @param {string} type
   * @param {Object} payload
   */
  broadcast(type, payload) {
    this.transport.broadcast.emit(type, this.serializer.serialize(payload));
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
    this.transport.on(type, (payload) => callback(this.serializer.parse(payload)));
  }
}

export default WebsocketTransport;
