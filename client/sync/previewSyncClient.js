/**
 * Synchronizes view between all clients using websockets
 */
import * as Protocol from '../../common/previewProtocol.js';
import app from 'ampersand-app';
import {showPhoto, receivePreview} from '../actions/photoActions.js';

var socket = io.connect('http://localhost:8000'); // TODO: replace connection URL with variable injection

export function broadcastSwitchPhoto(currentPhoto) {
  socket.emit(Protocol.CHANGE_PHOTO, JSON.stringify({currentPhoto}));
}

function initializePreview(data) {
  var preview = JSON.parse(data);
  app.store.dispatch(receivePreview(preview.photos, preview.navigation.index));
}

function changePhoto(data) {
  app.store.dispatch(showPhoto(JSON.parse(data).currentPhoto));
}

socket.on(Protocol.INITIALIZE_PREVIEW, initializePreview);
socket.on(Protocol.CHANGE_PHOTO, changePhoto);
