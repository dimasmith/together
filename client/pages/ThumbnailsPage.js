/**
 * Displays single photo
 */
import AmpersandState from 'ampersand-state';
import AmpersandCollection from 'ampersand-collection';

import BasePage from './BasePage.js';
import ThumbnailView from '../views/ThumbnailView.js';
import ThumbnailsToolbarView from '../views/ThumbnailsToolbarView.js';
import app from 'ampersand-app';
import template from '../templates/pages/thumbnailsPage.jade';

const Photo = AmpersandState.extend({
  props: {
    url: ['string'],
    date: ['date'],
  },
  session: {
    selected: ['boolean', true, false],
    index: ['number'],
  },
});

const PhotosCollection = AmpersandCollection.extend({
  model: Photo,
  selectPhoto(index) {
    this.forEach((model, i) => model.selected = i === index);
  },
});

export default BasePage.extend({

  autoRender: true,
  template,

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
    const photos = state.photos;
    this.photosCollection.reset(photos);

    const index = state.navigation.index;
    this.photosCollection.selectPhoto(index);
  },

  render() {
    this.update();
    this.renderWithTemplate();
    this.renderCollection(this.photosCollection, ThumbnailView, '.thumbnails');
    this.showToolbar(new ThumbnailsToolbarView());
    this.setFixed(false);
  },
});
