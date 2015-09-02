/**
 * Displays single photo
 */
import AmpersandView from 'ampersand-view';

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

  initialize(options) {
    this.store = options.store;
    this.unsubscribeStore = this.store.subscribe(this.handleChange.bind(this));
    this.listenTo(this, 'remove', () => this.unsubscribeStore());
  },

  handleChange() {
    let state = this.store.getState();
    let photo = state.photos[state.photoNavigator.currentPhoto];
    if (photo) {
      this.url = photo.url;
    }
  },
});
