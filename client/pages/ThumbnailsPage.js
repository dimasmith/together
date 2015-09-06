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
  session: {
    selected: ['boolean', true, false],
    index: ['number'],
  },
});

var PhotosCollection = AmpersandCollection.extend({
  model: Photo,
  selectPhoto(index) {
    this.forEach((model, i) => model.selected = i === index);
  },
});

//noinspection JSUnusedGlobalSymbols
export default AmpersandView.extend({

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
    let photos = state.photos;
    this.photosCollection.reset(photos);

    let index = state.navigation.index;
    this.photosCollection.selectPhoto(index);
  },

  render() {
    this.update();
    this.renderWithTemplate();
    this.renderCollection(this.photosCollection, ThumbnailView, '.b-thumbnails__container');
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
