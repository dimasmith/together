import AmpersandView from 'ampersand-view';

import {addNewPhotos} from '../commands/galleryCommands.js';
import app from 'ampersand-app';

/* global Dropbox */
const dropboxToPhoto = file => {
  return {url: file.thumbnailLink.replace('bounding_box=75', 'bounding_box=1280')};
};

export default AmpersandView.extend({
  render() {
    const dropboxButton = Dropbox.createChooseButton({
      multiselect: true,
      extensions: ['images'],
      success: files => app.dispatchAction(addNewPhotos(files.map(dropboxToPhoto))),
    });
    this.queryByHook('dropbox-button').appendChild(dropboxButton);
  },

  autoRender: true,
});
