/**
 * Singleton application store instance
 */
import {THUMBNAILS_MODE, setCurrentPhotoIndex, setPhotos as updatePhotos, setViewMode, createPreview} from '../common/gallery.js';

let gallery = createPreview();

/**
 * Open photo in photo view in gallery.
 * @param {number} index
 */
export function openPhoto(index) {
  gallery = setCurrentPhotoIndex(gallery, index);
}

/**
 * Open thumbnails view of gallery
 */
export function openThumbnails() {
  gallery = setViewMode(gallery, THUMBNAILS_MODE);
}

/**
 * Initialize gallery with photos.
 * @param {array} photos
 */
export function setPhotos(photos) {
  gallery = updatePhotos(gallery, photos);
}

/**
 * Get current gallery state
 * @returns {Object} copy of gallery state.
 */
export function getState() {
  return Object.assign({}, gallery);
}
