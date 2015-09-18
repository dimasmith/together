import * as gallery from './gallery.js';

class GalleryService {

  constructor(store = gallery) {
    this.store = store;
  }

  /**
   * Reset photos of gallery
   * @param {array} photos
   */
  setPhotos(photos) {
    this.store.setPhotos(photos);
    return this.getState();
  }

  showPhoto(index) {
    this.store.openPhoto(index);
    return this.getState();
  }

  showThumbnails() {
    this.store.openThumbnails();
    return this.getState();
  }

  getState() {
    return this.store.getState();
  }
}

export default GalleryService;
