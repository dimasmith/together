/**
 * Synchronizes view between all clients using websockets
 */
import * as Protocol from '../../common/previewProtocol.js';
import app from 'ampersand-app';
import {showPhoto} from '../actions/photoActions.js';
import {showThumbnails} from '../actions/navigationActions.js';
import SocketTransport from '../../common/SocketTransport.js';

var transport = new SocketTransport(io.connect(WEBSOCKET_ADDRESS));

export function broadcastSwitchPhoto(index) {
  transport.send(
    Protocol.CHANGE_PHOTO,
    JSON.stringify({index})
  );
}

export function loadPreview() {
  transport.send(Protocol.REQUEST_PREVIEW);
  return new Promise((resolve) => {
    transport.on(
      Protocol.INITIALIZE_PREVIEW,
        data => resolve(JSON.parse(data))
    );
  });
}

export function broadcastOpenThumbnails() {
  transport.send(Protocol.SHOW_THUMBNAILS);
}

function changePhoto(data) {
  var response = JSON.parse(data);
  app.store.dispatch(showPhoto(response.index));
}

transport.on(Protocol.CHANGE_PHOTO, changePhoto);
transport.on(Protocol.SHOW_THUMBNAILS, () => app.dispatchAction(showThumbnails()));
