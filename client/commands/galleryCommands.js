/**
 * Application actions and action creators
 */
import app from 'ampersand-app';
import {showThumbnails, showNextPhoto, showPreviousPhoto, requestGallery, receiveGallery} from '../actions/galleryActions.js';

const syncClient = app.syncClient;

export function openThumbnails() {
  return (dispatch) => {
    dispatch(showThumbnails());
    syncClient.onShowThumbnails();
  };
}

function hasNextPhoto(state) {
  return state.navigation.index < state.navigation.count - 1;
}

function hasPreviousPhoto(state) {
  return state.navigation.index >= 0;
}

function notifyNextPhoto(state) {
  syncClient.openPhoto(state.navigation.index + 1);
}

function notifyPreviousPhoto(state) {
  syncClient.openPhoto(state.navigation.index - 1);
}

function isIndexInBounds(state, index) {
  return index >= 0 && index < state.photos.length;
}

function notifyPhotoIndex(index) {
  syncClient.openPhoto(index);
}

export function nextPhoto() {
  return (dispatch, getState) => {
    if (hasNextPhoto(getState())) {
      notifyNextPhoto(getState());
      dispatch(showNextPhoto());
    } else {
      return Promise.resolve();
    }
  };
}

export function previousPhoto() {
  return (dispatch, getState) => {
    if (hasPreviousPhoto(getState())) {
      notifyPreviousPhoto(getState());
      dispatch(showPreviousPhoto());
    } else {
      return Promise.resolve();
    }
  };
}

export function switchToPhoto(index) {
  return (dispatch, getState) => {
    if (isIndexInBounds(getState(), index)) {
      notifyPhotoIndex(index);
      dispatch(showPhoto(index));
    } else {
      return Promise.resolve();
    }
  };
}

export function initializeGallery() {
  return (dispatch) => {
    dispatch(requestGallery());

    return syncClient.loadGallery()
      .then(data => dispatch(receiveGallery(data)))
      .catch(err => console.error(err));
  };
}

syncClient.onShowPhoto((navigation) => app.store.dispatch(showPhoto(navigation.index)));
syncClient.onShowThumbnails(() => app.dispatchAction(showThumbnails()));
