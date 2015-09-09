import * as Protocol from './previewProtocol.js';
/**
 * Gallery synchronization protocol client
 */
class SyncClient {

  constructor(transport) {
    this.transport = transport;
  }

  /**
   * Tells server that photo with given index were open
   * @param index zero based index of photo
   */
  openPhoto(index) {
    this.transport.send(
      Protocol.CHANGE_PHOTO,
      JSON.stringify({index})
    );
  }

  /**
   * Open gallery thumbnails view
   */
  openThumbnails() {
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
    this.transport.send(Protocol.REQUEST_PREVIEW);
    return new Promise((resolve) => {
      this.transport.on(
        Protocol.INITIALIZE_PREVIEW,
          data => resolve(JSON.parse(data))
      );
    });
  }
}

export default SyncClient;
