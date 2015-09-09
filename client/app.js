/**
 * Initial application file
 */
import app from 'ampersand-app';
import domready from 'domready';
import { createStore, applyMiddleware } from 'redux';
import loggerMiddleware from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

import MainPage from './pages/MainPage.js';
import PhotoPage from './pages/PhotoPage.js';
import ThumbnailsPage from './pages/ThumbnailsPage.js';
import rootReducer from './reducers/photosReducers.js';
import {initializeGallery}  from './actions/galleryActions.js';
import syncClient from './sync/syncClient.js';

import * as Stylesheet from './stylesheets/together.scss';

import PatchedView from './patch/AmpersandView.js';

const createStoreWithMiddleware = applyMiddleware(
  loggerMiddleware, thunkMiddleware
)(createStore);

app.extend({

  store: createStoreWithMiddleware(rootReducer),
  syncClient,

  init() {
    this.mainView = new MainPage({el: document.body});
    this.mainView.render();
    this.dispatchAction(initializeGallery());
  },

  dispatchAction: function(action) {
    this.store.dispatch(action);
  },
});

domready(app.init.bind(app));
