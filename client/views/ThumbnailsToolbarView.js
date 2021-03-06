/**
 * Navigate back and forth between photos
 */
import AmpersandView from 'ampersand-view';

import app from 'ampersand-app';
import template from '../templates/views/thumbnailsToolbar.jade';

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
