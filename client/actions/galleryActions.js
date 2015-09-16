/**
 * Application actions and action creators
 */

export const REQUEST_PREVIEW = 'REQUEST_PREVIEW';
export function requestGallery() {
  return {
    type: REQUEST_PREVIEW,
  };
}

export const RECEIVE_PREVIEW = 'RECEIVE_PREVIEW';
export function receiveGallery(preview) {
  return {
    type: RECEIVE_PREVIEW,
    preview,
  };
}

export const NEXT_PHOTO = 'NEXT_PHOTO';
export function showNextPhoto() {
  return {
    type: NEXT_PHOTO,
  };
}

export const PREVIOUS_PHOTO = 'PREVIOUS_PHOTO';
export function showPreviousPhoto() {
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
