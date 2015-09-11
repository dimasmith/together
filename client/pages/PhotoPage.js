/**
 * Displays single photo
 */
import AmpersandView from 'ampersand-view';
import Combokeys from 'combokeys';

import PhotoToolbarView from '../views/PhotoToolbarView.js';
import {nextPhoto, previousPhoto, openThumbnails} from '../commands/galleryCommands.js';
import app from 'ampersand-app';
import template from '../templates/photoPage.jade';

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

    this.combokeys = new Combokeys(document.documentElement);
    this.combokeys.bind('left', () => app.dispatchAction(previousPhoto()));
    this.combokeys.bind('right', () => app.dispatchAction(nextPhoto()));
    this.combokeys.bind('esc', () => app.dispatchAction(openThumbnails()));
    this.combokeys.bind('up', () => app.dispatchAction(openThumbnails()));
    this.on('remove', () => this.combokeys.detach());
  },

  render() {
    this.renderWithTemplate();
    this.update();
  },

  update() {
    this.setState(app.store.getState());
  },

  setState(state) {
    let photo = state.photos[state.navigation.index];
    if (photo) {
      this.url = photo.url;
    }
  },

  subviews: {
    toolbar: {
      selector: '.b-photo-toolbar',
      prepareView(el) {
        return new PhotoToolbarView({el});
      },
    },
  },
});
