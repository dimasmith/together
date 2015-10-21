/**
 * Navigate back and forth between photos
 */
import AmpersandView from 'ampersand-view';

import {addNewPhotos} from '../commands/galleryCommands.js';

import app from 'ampersand-app';
import template from '../templates/views/thumbnailsToolbar.jade';

const dropboxToPhoto = file => {
  console.log(file);
  return {url: file.thumbnailLink.replace('bounding_box=75', 'bounding_box=1280')};
};

export default AmpersandView.extend({

  initialize() {
    this.unsubscribeStore = app.store.subscribe(() => this.update());
    this.on('remove', this.unsubscribeStore);
  },

  update() {
    this.setState(app.store.getState());
  },

  setState(state) {
    this.count = state.navigation.count || 0;
    this.index = state.navigation.index || 0;
  },

  render() {
    this.renderWithTemplate();
    this.update();
    const dropboxButton = Dropbox.createChooseButton({
      multiselect: true,
      extensions: ['images'],
      success: files => app.dispatchAction(addNewPhotos(files.map(dropboxToPhoto))),
    });
    this.queryByHook('dropbox-button').appendChild(dropboxButton);
  },

  props: {
    count: ['number', true, 0],
    index: ['number', true, 0],
  },

  derived: {
    humanReadableIndex: {
      deps: ['index'],
      fn() {
        return this.index + 1;
      },
    },
    position: {
      deps: ['index', 'count'],
      fn() {
        return `${this.humanReadableIndex} of ${this.count}`;
      },
    },
  },

  template,
  autoRender: true,

  bindings: {
    position: '[data-hook=navigation-label]',
  },
});
