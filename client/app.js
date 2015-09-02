/**
 * Initial application file
 */
import app from 'ampersand-app';
import domready from 'domready';

import MainPage from './js/MainPage.js';

app.extend({

  mainView: new MainPage({el: document.body}),

  init() {
    this.mainView.render();
  },
});

domready(app.init.bind(app));
