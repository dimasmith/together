/**
 * Main application page that includes manages subpages and regions
 */

import AmpersandView from 'ampersand-view';
import ViewSwitcher from 'ampersand-view-switcher';

import mainPageTemplate from '../templates/mainPage.jade';
import app from 'ampersand-app';

export default AmpersandView.extend({
  template: mainPageTemplate,

  props: {
    fixed: ['boolean', false, false],
  },

  render() {
    this.renderWithTemplate();
    this.pageSwitcher = new ViewSwitcher(this.query('.page__body'));
    this.toolbarSwitcher = new ViewSwitcher(this.query('.page__toolbar'));
  },

  showPage(view) {
    this.pageSwitcher.set(view);
  },

  showToolbar(view) {
    this.toolbarSwitcher.set(view);
  },

  bindings: {
    fixed: {
      type: 'booleanClass',
      selector: '.page',
      name: 'page_fixed',
    },
  },
});
