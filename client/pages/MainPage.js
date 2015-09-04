/**
 * Main application page that includes manages subpages and regions
 */

import AmpersandView from 'ampersand-view';
import ViewSwitcher from 'ampersand-view-switcher';

import mainPageTemplate from '../templates/mainPage.jade';

export default AmpersandView.extend({
  template: mainPageTemplate,

  render() {
    this.renderWithTemplate();

    this.pageContainer = this.queryByHook('page-container');
    this.viewSwitcher = new ViewSwitcher(this.pageContainer, {
      hide(oldView) {

        // workaround for view removal issue.
        oldView.remove = function() {
          if (this.el && this.el.parentNode) this.el.parentNode.removeChild(this.el);
          if (this._subviews) invoke(flatten(this._subviews), 'remove');
          this.stopListening();
        };
      },
    });
  },

  showPage(view) {
    this.viewSwitcher.set(view);
  },
});
