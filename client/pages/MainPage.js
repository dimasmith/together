/**
 * Main application page that includes manages subpages and regions
 */

import AmpersandView from 'ampersand-view';
import ViewSwitcher from 'ampersand-view-switcher';

import mainPageTemplate from '../templates/mainPage.jade';
import app from 'ampersand-app';

export default AmpersandView.extend({
  template: mainPageTemplate,

  render() {
    this.renderWithTemplate();
    this.viewSwitcher = new ViewSwitcher(this.queryByHook('page-container'));
  },

  showPage(view) {
    this.viewSwitcher.set(view);
  },
});
