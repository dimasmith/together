/**
 * Wraps websocket to common transport interface.
 * @version 0.1.0
 */
class WebsocketTransport {

  constructor(socket) {
    this.transport = socket;
  }

  /**
   * Send message directly to client.
   * @param type
   * @param payload
   */
  send(type, payload) {
    this.transport.emit(type, payload);
  }

  /**
   * Send message to all connected clients except of one connected to this transport.
   * @param type
   * @param payload
   */
  broadcast(type, payload) {
    this.transport.broadcast.emit(type, payload);
  }

  on(type, callback) {
    this.transport.on(type, callback);
  }
}

export default WebsocketTransport;
