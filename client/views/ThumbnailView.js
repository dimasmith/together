/**
 * Single thumbnail view
 */
import AmpersandView from 'ampersand-view';

import {switchToPhoto} from '../commands/galleryCommands.js';
import template from '../templates/views/thumbnailView.jade';
import app from 'ampersand-app';

export default AmpersandView.extend({
  autoRender: true,
  template,

  events: {
    'click .b-thumbnail__image': 'onImageClick',
  },

  onImageClick(evt) {
    evt.preventDefault();
    let index = this.collection.indexOf(this.model);
    app.dispatchAction(switchToPhoto(index));
  },

  bindings: {
    'model.url': {
      selector: '.b-thumbnail__image',
      type: 'attribute',
      name: 'src',
    },
    'model.selected': {
      selector: '.b-thumbnail',
      type: 'booleanClass',
      name: 'b-thumbnail_selected',
    },
  },
});
