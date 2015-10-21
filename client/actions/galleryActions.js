/**
 * Application actions and action creators
 */
import {ADD_PHOTOS, REQUEST_PREVIEW, RECEIVE_PREVIEW, NEXT_PHOTO, PREVIOUS_PHOTO, SHOW_PHOTO, SHOW_THUMBNAILS} from '../../common/constants/actionTypes.js';

export function requestGallery() {
  return {
    type: REQUEST_PREVIEW,
  };
}

export function receiveGallery(preview) {
  return {
    type: RECEIVE_PREVIEW,
    preview,
  };
}

export function showNextPhoto() {
  return {
    type: NEXT_PHOTO,
  };
}

export function showPreviousPhoto() {
  return {
    type: PREVIOUS_PHOTO,
  };
}

export function showPhoto(index) {
  return {
    type: SHOW_PHOTO,
    index,
  };
}

export function showThumbnails() {
  return {
    type: SHOW_THUMBNAILS,
  };
}

export function addPhotos(photos) {
  return {
    type: ADD_PHOTOS,
    photos,
  };
}
