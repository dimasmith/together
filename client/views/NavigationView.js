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
    this.unsubscribeStore = app.store.subscribe(this.updateState.bind(this));
    this.listenTo(this, 'remove', this.cleanup);
  },

  cleanup() {
    this.unsubscribeStore();
  },

  updateState() {
    this.setState(app.store.getState());
  },

  setState(state) {
    this.count = state.photoNavigator.count || 0;
    this.currentPhoto = state.photoNavigator.currentPhoto || 0;
  },

  render() {
    this.renderWithTemplate();
    this.updateState();
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

    index: {
      deps: ['currentPhoto'],
      fn: function() {
        return this.currentPhoto + 1;
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
    index: '[data-hook=photos-index]',
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
