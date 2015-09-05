/**
 * Navigate back and forth between photos
 */
import AmpersandView from 'ampersand-view';

import {previousPhoto, nextPhoto} from '../actions/photoActions.js';
import {openThumbnails} from '../actions/navigationActions.js';
import app from 'ampersand-app';
import template from '../templates/views/photoToolbar.jade';

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

  onThumbnailsClick(evt) {
    evt.preventDefault();
    app.dispatchAction(openThumbnails());
  },

  events: {
    'click .b-photo-toolbar__thumbnails-button': 'onThumbnailsClick',
  },

  props: {
    count: ['number', true, 0],
    index: ['number', true, 0],
  },

  derived: {
    humanReadableIndex: {
      deps: ['index'],
      fn: function() {
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
    position: '.b-photo-toolbar__counter',
  },
});
