/**
 * Application actions and action creators
 */
export const REQUEST_PHOTOS = 'REQUEST_PHOTOS';
export function requestPhotos() {
  return {
    type: REQUEST_PHOTOS,
  };
}

export const RECEIVE_PHOTOS = 'RECEIVE_PHOTOS';
export function receivePhotos(photos) {
  return {
    type: RECEIVE_PHOTOS,
    photos,
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
