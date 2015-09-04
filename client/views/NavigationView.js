/**
 * Navigate back and forth between photos
 */
import AmpersandView from 'ampersand-view';

import {previousPhoto, nextPhoto} from '../actions/photoActions.js';
import app from 'ampersand-app';
import template from '../templates/views/navigation.jade';

//noinspection JSUnusedGlobalSymbols
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
    hasNoPrevious: {
      deps: ['count', 'index'],
      fn: function() {
        return this.index <= 0;
      },
    },

    hasNoNext: {
      deps: ['count', 'index'],
      fn: function() {
        return this.index >= this.count - 1;
      },
    },

    humanReadableIndex: {
      deps: ['index'],
      fn: function() {
        return this.index + 1;
      },
    },
  },

  template,
  autoRender: true,

  events: {
    'click .b-photo-nav__button-next': 'onNextPhotoButtonClick',
    'click .b-photo-nav__button-previous': 'onPreviousPhotoButtonClick',
  },

  bindings: {
    hasNoPrevious: {
      selector: '.b-photo-nav__button-previous',
      type: 'booleanAttribute',
      name: 'disabled',
    },
    hasNoNext: {
      selector: '.b-photo-nav__button-next',
      type: 'booleanAttribute',
      name: 'disabled',
    },
    humanReadableIndex: '[data-hook=photos-index]',
    count: '[data-hook=photos-count]',
  },

  onNextPhotoButtonClick(evt) {
    evt.preventDefault();
    app.store.dispatch(nextPhoto());
  },

  onPreviousPhotoButtonClick(evt) {
    evt.preventDefault();
    app.store.dispatch(previousPhoto());
  },

});
