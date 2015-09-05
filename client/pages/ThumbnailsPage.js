/**
 * Displays single photo
 */
import AmpersandView from 'ampersand-view';
import AmpersandState from 'ampersand-state';
import AmpersandCollection from 'ampersand-collection';

import ThumbnailView from '../views/ThumbnailView.js';
import ThumbnailsToolbarView from '../views/ThumbnailsToolbarView.js';
import app from 'ampersand-app';
import template from '../templates/thumbnailsPage.jade';

var Photo = AmpersandState.extend({
  props: {
    url: ['string'],
    date: ['date'],
  },
});

var PhotosCollection = AmpersandCollection.extend({
  model: Photo,
});

//noinspection JSUnusedGlobalSymbols
export default AmpersandView.extend({

  autoRender: true,
  template,
  props: {
    url: ['string', false],
  },

  bindings: {
    url: {
      selector: '.b-photo__image',
      type: 'attribute',
      name: 'src',
    },
  },

  initialize() {
    this.unsubscribeStore = app.store.subscribe(() => this.update());
    this.on('remove', this.unsubscribeStore);
    this.photosCollection = new PhotosCollection();
  },

  update() {
    this.setState(app.store.getState());
  },

  setState(state) {
    let photos = state.photos;
    this.photosCollection.reset(photos);
  },

  render() {
    this.renderWithTemplate();
    this.renderCollection(this.photosCollection, ThumbnailView, '.b-thumbnails__container');
    this.update();
  },

  subviews: {
    toolbar: {
      selector: '.b-photo-toolbar',
      prepareView(el) {
        return new ThumbnailsToolbarView({el});
      },
    },
  },
});
