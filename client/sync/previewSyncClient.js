/**
 * Synchronizes view between all clients using websockets
 */
import * as Protocol from '../../common/previewProtocol.js';
import app from 'ampersand-app';
import {showPhoto, receivePhotos} from '../actions/photoActions.js';

var socket = io.connect('http://localhost:8000'); // TODO: replace connection URL with variable injection

export function broadcastSwitchPhoto(currentPhoto) {
  socket.emit(Protocol.CHANGE_PHOTO, JSON.stringify({currentPhoto}));
}

function initializePreview(data) {
  app.store.dispatch(receivePhotos(JSON.parse(data).photos));
}

function changePhoto(data) {
  app.store.dispatch(showPhoto(JSON.parse(data).currentPhoto));
}

socket.on(Protocol.INITIALIZE_PREVIEW, initializePreview);
socket.on(Protocol.CHANGE_PHOTO, changePhoto);
