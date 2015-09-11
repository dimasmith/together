/**
 * Client communication session.
 */
import {CHANGE_PHOTO, INITIALIZE_PREVIEW, REQUEST_PREVIEW, SHOW_THUMBNAILS}  from '../common/previewProtocol';

class Session {

  constructor(transport, gallery) {
    this.transport = transport;
    this.gallery = gallery;

    transport.on(REQUEST_PREVIEW, () => this.sendPreview());
    transport.on(CHANGE_PHOTO, (data) => this.onChangePhoto(data));
    transport.on(SHOW_THUMBNAILS, () => this.onShowThumbnails());
  }

  sendPreview() {
    this.transport.send(
      INITIALIZE_PREVIEW,
      JSON.stringify(this.gallery.getState()));
  }

  onChangePhoto(data) {
    var response = JSON.parse(data);
    var index = response.index;
    this.gallery.openPhoto(index);
    this.transport.broadcast(
      CHANGE_PHOTO,
      JSON.stringify({index: this.gallery.getState().navigation.index})
    );
  }

  onShowThumbnails() {
    this.gallery.openThumbnails();
    this.transport.broadcast(
      SHOW_THUMBNAILS
    );
  }

  static start(transport, gallery) {
    return new Session(transport, gallery);
  }
}

export default Session;
