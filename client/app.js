/**
 * Initial application file
 */
import app from 'ampersand-app';
import domready from 'domready';
import { createStore, applyMiddleware } from 'redux';
import loggerMiddleware from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

import MainPage from './pages/MainPage.js';
import Router from './Router.js';
import rootReducer from './reducers/galleryReducers.js';
import {initializeGallery}  from './commands/galleryCommands.js';
import syncClient from './sync/syncClient.js';

/* eslint-disable no-unused-vars */
import stylesheet from './stylesheets/together.scss';
import PatchedView from './patch/AmpersandView.js';
/* eslint-enable no-unused-vars */

const createStoreWithMiddleware = applyMiddleware(
  loggerMiddleware, thunkMiddleware
)(createStore);

app.extend({

  store: createStoreWithMiddleware(rootReducer),
  syncClient,

  init() {
    this.mainView = new MainPage({el: document.body});
    this.mainView.render();
    this.router = new Router(this.store, this.mainView);
    this.dispatchAction(initializeGallery());
  },

  dispatchAction(action) {
    this.store.dispatch(action);
  },
});

domready(() => app.init());
