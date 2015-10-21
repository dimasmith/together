/**
 * Server communication of gallery state between server and clients.
 */
import SocketTransport from '../common/SocketTransport.js';
import Server from '../common/SyncServer.js';

export default function(io, gallery) {
  io.on('connection', (socket) => {
    const server = new Server(new SocketTransport(socket));

    server.onRequestGallery(() => server.sendGallery(gallery.getState()));

    server.onShowThumbnails(() => {
      gallery.showThumbnails();
      server.sendShowThumbnails();
    });

    server.onShowPhoto((data) => {
      gallery.showPhoto(data.index);
      server.sendShowPhoto(gallery.getState().navigation);
    });

    server.onAddPhotos(photos => {
      gallery.addPhotos(photos);
      server.sendAddPhotos(photos);
    });
  });
}
