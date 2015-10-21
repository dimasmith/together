/**
 * Synchronizes view between all clients using websockets
 */
/* global WEBSOCKET_ADDRESS */
import SocketTransport from '../../common/SocketTransport.js';
import SyncClient from '../../common/SyncClient.js';
import io from 'socket.io-client';

import app from 'ampersand-app';
import {showPhoto, showThumbnails} from '../actions/galleryActions.js';

const syncClient = new SyncClient(
  new SocketTransport(
    io.connect(WEBSOCKET_ADDRESS)
  )
);

syncClient.onShowPhoto(navigation => app.dispatchAction(showPhoto(navigation.index)));
syncClient.onShowThumbnails(() => app.dispatchAction(showThumbnails()));

export default syncClient;
