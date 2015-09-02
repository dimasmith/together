/**
 * Main application page that includes manages subpages and regions
 */

import AmpersandView from 'ampersand-view';
import ViewSwitcher from 'ampersand-view-switcher';

import NavigationView from '../views/NavigationView.js';
import mainPageTemplate from '../templates/mainPage.jade';

export default AmpersandView.extend({
  template: mainPageTemplate,

  render() {
    this.renderWithTemplate();

    this.pageContainer = this.queryByHook('page-container');
    this.viewSwitcher = new ViewSwitcher(this.pageContainer, {});
  },

  showPage(view) {
    this.viewSwitcher.set(view);
  },

  subviews: {
    navigation: {
      selector: 'footer',
      prepareView(el) {
        return new NavigationView({el: el});
      },
    },
  },
});
