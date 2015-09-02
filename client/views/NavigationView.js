/**
 * Navigate back and forth between photos
 */
import AmpersandView from 'ampersand-view';

import {showNextPhoto, showPreviousPhoto} from '../actions/photoActions.js';
import app from 'ampersand-app';
import template from '../templates/views/navigation.jade';

export default AmpersandView.extend({

  initialize() {
    this.unsubscribeStore = app.store.subscribe(this.handleChanges.bind(this));
    this.listenTo(this, 'remove', this.cleanup);
  },

  cleanup() {
    this.unsubscribeStore();
  },

  handleChanges() {
    var state = app.store.getState();
    this.count = state.photoNavigator.count;
    this.currentPhoto = state.photoNavigator.currentPhoto;
  },

  props: {
    count: ['number', true, 0],
    currentPhoto: ['number', true, 0],
  },

  derived: {
    hasNoPrevious: {
      deps: ['count', 'currentPhoto'],
      fn: function() {
        return this.currentPhoto <= 0;
      },
    },

    hasNoNext: {
      deps: ['count', 'currentPhoto'],
      fn: function() {
        return this.currentPhoto >= this.count - 1;
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
  },

  onNextPhotoButtonClick(evt) {
    evt.preventDefault();
    app.store.dispatch(showNextPhoto());
  },

  onPreviousPhotoButtonClick(evt) {
    evt.preventDefault();
    app.store.dispatch(showPreviousPhoto());
  },

});
