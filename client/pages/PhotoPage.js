/**
 * Displays single photo
 */
import AmpersandView from 'ampersand-view';

import NavigationView from '../views/NavigationView.js';
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
    navigation: {
      selector: 'footer',
      prepareView(el) {
        return new NavigationView({el: el});
      },
    },
  },
});
