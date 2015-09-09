/**
 * Synchronizes view between all clients using websockets
 */
import SocketTransport from '../../common/SocketTransport.js';
import SyncClient from '../../common/SyncClient.js';

export default new SyncClient(
  new SocketTransport(
    io.connect(WEBSOCKET_ADDRESS)
  )
);
