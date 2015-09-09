/**
 * Synchronizes view between all clients using websockets
 */
import * as Protocol from '../../common/previewProtocol.js';
import app from 'ampersand-app';
import {showPhoto, showThumbnails} from '../actions/galleryActions.js';
import SocketTransport from '../../common/SocketTransport.js';
import SyncClient from '../../common/SyncClient.js';

var transport = new SocketTransport(io.connect(WEBSOCKET_ADDRESS));
var syncClient = new SyncClient();

export function broadcastSwitchPhoto(index) {
  syncClient.openPhoto(index);
}

export function loadGallery() {
  return syncClient.loadGallery();
}

export function broadcastOpenThumbnails() {
  syncClient.openThumbnails();
}

function changePhoto(data) {
  var response = JSON.parse(data);
  app.store.dispatch(showPhoto(response.index));
}

transport.on(Protocol.CHANGE_PHOTO, changePhoto);
transport.on(Protocol.SHOW_THUMBNAILS, () => app.dispatchAction(showThumbnails()));
