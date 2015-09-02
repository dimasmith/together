/**
 * Initial application file
 */
var app = require('ampersand-app');
var domready = require('domready');

var MainPage = require('./js/MainPage');

app.extend({

  init: function() {
    this.mainView = new MainPage({el: document.body});
    this.mainView.render();
  },
});

domready(app.init.bind(app));
