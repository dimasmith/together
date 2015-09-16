/**
 * Server communication of gallery state between server and clients.
 */
import SocketTransport from '../common/SocketTransport.js';
import Server from '../common/SyncServer.js';

export default function(io, gallery) {
  io.on('connection', (socket) => {
    const session = new Server(new SocketTransport(socket));

    session.onRequestGallery(() => session.sendGallery(gallery.getState()));
    session.onShowThumbnails(() => {
      gallery.openThumbnails();
      session.sendShowThumbnails();
    });

    session.onShowPhoto((data) => {
      gallery.openPhoto(data.index);
      session.sendShowPhoto(gallery.getState().navigation);
    });
  });
}
