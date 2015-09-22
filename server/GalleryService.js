import {switchPhoto} from './commands/commands.js';
import {setPhotos, showThumbnails} from './actions/actions.js';

class GalleryService {

  constructor(store) {
    this.store = store;
  }

  /**
   * Reset photos of gallery
   * @param {array} photos
   */
  setPhotos(photos) {
    this.store.dispatch(setPhotos(photos));
    return this.getState();
  }

  showPhoto(index) {
    this.store.dispatch(switchPhoto(index));
    return this.getState();
  }

  showThumbnails() {
    this.store.dispatch(showThumbnails());
    return this.getState();
  }

  getState() {
    return this.store.getState();
  }
}

export default GalleryService;
