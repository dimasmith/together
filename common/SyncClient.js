import * as Protocol from './synchronizationProtocol.js';

/**
 * Gallery synchronization protocol client
 */
class SyncClient {

  constructor(transport) {
    if (!transport) {
      throw new Error('Missing transport for SyncClient');
    }

    this.transport = transport;
  }

  /**
   * Tells server that photo with given index were open
   * @param {Object} navigation with index property containing photo index
   */
  sendShowPhoto(navigation) {
    this.transport.send(
      Protocol.SHOW_PHOTO,
      {index: navigation.index}
    );
  }

  /**
   * Open gallery thumbnails view
   */
  sendShowThumbnails() {
    this.transport.send(Protocol.SHOW_THUMBNAILS);
  }

  /**
   * Load gallery from server.
   * Loading is asynchronous so promise is returned.
   * It will be resolved with raw gallery data upon
   * loading
   * @returns {Promise}
   */
  loadGallery() {
    this.transport.send(Protocol.REQUEST_GALLERY);
    return new Promise((resolve) => {
      this.transport.on(
        Protocol.INITIALIZE_GALLERY,
          data => resolve(data)
      );
    });
  }

  /**
   * Calls supplied callback when photo changed on server.
   * Passes navigation data as parameter
   * @param callback
   */
  onShowPhoto(callback) {
    this.transport.on(Protocol.SHOW_PHOTO, (data) => callback(data));
  }

  /**
   * Calls supplied callback when server switches to thumbnails view.
   * @param callback
   */
  onShowThumbnails(callback) {
    this.transport.on(Protocol.SHOW_THUMBNAILS, () => callback());
  }
}

export default SyncClient;
