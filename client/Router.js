import {PHOTO_MODE, THUMBNAILS_MODE} from '../common/gallery.js';
import ThumbnailsPage from './pages/ThumbnailsPage.js';
import PhotosPage from './pages/PhotoPage.js';

/**
 * Application router.
 * Does not check urls or hashes. It orchestrates views basing on state change.
 */
class Router {

  /**
   * Creates instance of router
   * @param {Object} store application store
   * @param {View} mainView view to render subviews into
   */
  constructor(store, mainView) {
    this.unsubscribeStore = store.subscribe(() => this.route(store.getState()));
    this.mainView = mainView;
  }

  route(state) {
    switch (state.navigation.viewMode) {
      case PHOTO_MODE:
        this.showPhoto();
        break;
      case THUMBNAILS_MODE:
        this.showThumbnails();
        break;
    }
  }

  showPhoto() {
    this.mainView.showPage(new PhotosPage());
  }

  showThumbnails() {
    this.mainView.showPage(new ThumbnailsPage());
  }
}

export default Router;
