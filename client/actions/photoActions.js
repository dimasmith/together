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
