/**
 * Actions for global application navigation
 */
import * as SyncClient from '../sync/previewSyncClient.js';
import app from 'ampersand-app';

export const SHOW_THUMBNAILS = 'SHOW_THUMBNAILS';
export function showThumbnails() {
  return {
    type: SHOW_THUMBNAILS,
  };
}

export function openThumbnails() {
  return (dispatch) => {
    dispatch(showThumbnails());
    SyncClient.broadcastOpenThumbnails();
  };
}
