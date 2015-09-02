/**
 * Main application page that includes manages subpages and regions
 */

var AmpersandView = require('ampersand-view');

var mainPageTemplate = require('../templates/mainPage.jade');

module.exports = AmpersandView.extend({
  template: mainPageTemplate,
});
