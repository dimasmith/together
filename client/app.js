/**
 * Initial application file
 */
import app from 'ampersand-app';
import domready from 'domready';
import { createStore, applyMiddleware } from 'redux';
import loggerMiddleware from 'redux-logger';

import MainPage from './pages/MainPage.js';
import PhotoPage from './pages/PhotoPage.js';
import rootReducer from './reducers/photosReducers.js';
import * as PhotoActions from './actions/photoActions.js';

const createStoreWithMiddleware = applyMiddleware(
  loggerMiddleware
)(createStore);

app.extend({

  store: createStoreWithMiddleware(rootReducer),
  mainView: new MainPage({el: document.body}),

  init() {
    this.mainView.render();
    this.mainView.showPage(new PhotoPage({store: this.store}));
    this.store.dispatch(PhotoActions.requestPhotos());
    this.store.dispatch(PhotoActions.receivePhotos(
      {
        1: {id: 1, url: 'http://lorempixel.com/800/600/people'},
        2: {id: 2, url: 'http://lorempixel.com/800/600/sport'},
        3: {id: 3, url: 'http://lorempixel.com/800/600/abstract'},
      }
    ));
  },
});

domready(app.init.bind(app));
