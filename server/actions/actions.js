import {extractIndex} from '../util/actionUtils.js';

export const SET_PHOTOS = 'SET_PHOTOS';

/**
 * Reset photos in gallery. Change navigation accordingly.
 * @param {array} photos array of photo objects
 */
export function setPhotos(photos) {
  return {
    photos,
    type: SET_PHOTOS,
  };
}

export const SHOW_PHOTO = 'SHOW_PHOTO';

/**
 * Show photo.
 * @param {object|number} navigation object containing index property of photo index number
 */
export function showPhoto(navigation) {
  const index = extractIndex(navigation);
  return {
    index,
    type: SHOW_PHOTO,
  };
}

export const SHOW_THUMBNAILS = 'SHOW_THUMBNAILS';
export function showThumbnails() {
  return {
    type: SHOW_THUMBNAILS,
  };
}
