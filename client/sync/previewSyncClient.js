/**
 * Synchronizes view between all clients using websockets
 */
import * as Protocol from '../../common/previewProtocol.js';
import app from 'ampersand-app';
import {showPhoto} from '../actions/photoActions.js';
import {showThumbnails} from '../actions/navigationActions.js';

var socket = io.connect(WEBSOCKET_ADDRESS);

export function broadcastSwitchPhoto(currentPhoto) {
  socket.emit(
    Protocol.CHANGE_PHOTO,
    JSON.stringify({currentPhoto})
  );
}

export function loadPreview() {
  socket.emit(Protocol.REQUEST_PREVIEW);
  return new Promise((resolve) => {
    socket.on(
      Protocol.INITIALIZE_PREVIEW,
      data => resolve(JSON.parse(data))
    );
  });
}

export function broadcastOpenThumbnails() {
  socket.emit(Protocol.SHOW_THUMBNAILS);
}

function changePhoto(data) {
  app.store.dispatch(showPhoto(JSON.parse(data).currentPhoto));
}

socket.on(Protocol.CHANGE_PHOTO, changePhoto);
socket.on(Protocol.SHOW_THUMBNAILS, () => app.dispatchAction(showThumbnails()));
