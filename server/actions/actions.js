import {extractIndex} from '../util/actionUtils.js';
import {SET_PHOTOS, SHOW_PHOTO, SHOW_THUMBNAILS, ADD_PHOTOS} from '../../common/constants/actionTypes.js';

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
