/**
 * Synchronizes view between all clients using websockets
 */
import {showPhoto} from '../actions/photoActions.js';
var socket = io.connect('http://localhost:8000');
import app from 'ampersand-app';

export function broadcastSwitchPhoto(currentPhoto) {
  socket.emit('SHOW_PHOTO', JSON.stringify({currentPhoto}));
}

socket.on('SYNC', data => app.store.dispatch(showPhoto(JSON.parse(data).currentPhoto)));
