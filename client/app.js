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
import rootReducer from './reducers/photosReducers.js';
import {initializePreview}  from './actions/photoActions.js';

const createStoreWithMiddleware = applyMiddleware(
  loggerMiddleware, thunkMiddleware
)(createStore);

app.extend({

  store: createStoreWithMiddleware(rootReducer),
  mainView: new MainPage({el: document.body}),

  init() {
    this.mainView.render();
    this.mainView.showPage(new PhotoPage({store: this.store}));

    this.store.dispatch(initializePreview());
  },
});

domready(app.init.bind(app));
