/**
 * Server communication of gallery state between server and clients.
 */
import SocketTransport from '../common/SocketTransport.js';
import Session from './Session.js';

export default function(io, gallery) {
  io.on('connection', (socket) => {
    Session.start(new SocketTransport(socket), gallery);
  });
}
