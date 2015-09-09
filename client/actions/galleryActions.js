/**
 * Application actions and action creators
 */
import * as PreviewClient from '../sync/previewSyncClient.js';

export const REQUEST_PREVIEW = 'REQUEST_PREVIEW';
function requestGallery() {
  return {
    type: REQUEST_PREVIEW,
  };
}

export const RECEIVE_PREVIEW = 'RECEIVE_PREVIEW';
function receiveGallery(preview) {
  return {
    type: RECEIVE_PREVIEW,
    preview,
  };
}

export const NEXT_PHOTO = 'NEXT_PHOTO';
function showNextPhoto() {
  return {
    type: NEXT_PHOTO,
  };
}

export const PREVIOUS_PHOTO = 'PREVIOUS_PHOTO';
function showPreviousPhoto() {
  return {
    type: PREVIOUS_PHOTO,
  };
}

export const SHOW_PHOTO = 'SHOW_PHOTO';
export function showPhoto(index) {
  return {
    type: SHOW_PHOTO,
    index,
  };
}

export const SHOW_THUMBNAILS = 'SHOW_THUMBNAILS';
export function showThumbnails() {
  return {
    type: SHOW_THUMBNAILS,
  };
}

export function openThumbnails() {
  return (dispatch) => {
    dispatch(showThumbnails());
    PreviewClient.broadcastOpenThumbnails();
  };
}

function hasNextPhoto(state) {
  return state.navigation.index < state.navigation.count - 1;
}

function hasPreviousPhoto(state) {
  return state.navigation.index >= 0;
}

function notifyNextPhoto(state) {
  PreviewClient.broadcastSwitchPhoto(state.navigation.index + 1);
}

function notifyPreviousPhoto(state) {
  PreviewClient.broadcastSwitchPhoto(state.navigation.index - 1);
}

function isIndexInBounds(state, index) {
  return index >= 0 && index < state.photos.length;
}

function notifyPhotoIndex(index) {
  PreviewClient.broadcastSwitchPhoto(index);
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

    return PreviewClient.loadGallery()
      .then(data => dispatch(receiveGallery(data)))
      .catch(err => console.error(err));
  };
}
