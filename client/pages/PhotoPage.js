/**
 * Displays single photo
 */
import AmpersandView from 'ampersand-view';

import NavigationView from '../views/NavigationView.js';
import app from 'ampersand-app';
import template from '../templates/photoPage.jade';

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
    this.unsubscribeStore = app.store.subscribe(
      () => this.handleChange(app.store.getState()));
    this.on('remove', this.unsubscribeStore);
  },

  handleChange(state) {
    let photo = state.photos[state.photoNavigator.currentPhoto];
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
