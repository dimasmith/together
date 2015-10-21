/**
 * Synchronizes view between all clients using websockets
 */
/* global io, WEBSOCKET_ADDRESS */
import SocketTransport from '../../common/SocketTransport.js';
import SyncClient from '../../common/SyncClient.js';
import app from 'ampersand-app';
import {showPhoto, showThumbnails} from '../actions/galleryActions.js';

const syncClient = new SyncClient(
  new SocketTransport(
    io.connect(WEBSOCKET_ADDRESS)
  )
);

syncClient.onShowPhoto((navigation) => app.store.dispatch(showPhoto(navigation.index)));
syncClient.onShowThumbnails(() => app.dispatchAction(showThumbnails()));

export default syncClient;
