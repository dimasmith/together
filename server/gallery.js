/**
 * Singleton application store instance
 */
import * as Preview from '../common/preview.js';

var gallery = Preview.createPreview();

/**
 * Open photo in photo view in gallery.
 * @param {number} index
 */
export function openPhoto(index) {
  gallery = Preview.setCurrentPhotoIndex(gallery, index);
}

/**
 * Open thumbnails view of gallery
 */
export function openThumbnails() {
  gallery = Preview.setViewMode(gallery, Preview.THUMBNAILS_MODE);
}

/**
 * Initialize gallery with photos.
 * @param {array} photos
 */
export function setPhotos(photos) {
  gallery = Preview.setPhotos(gallery, photos);
}

/**
 * Get current gallery state
 * @returns {Object} copy of gallery state.
 */
export function getState() {
  return Object.assign({}, gallery);
}
