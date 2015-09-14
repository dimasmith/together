import AmpersandView from 'ampersand-view';
import app from 'ampersand-app';

export default AmpersandView.extend({

  showBody(bodyView) {
    app.mainView.showPage(bodyView);
  },

  showToolbar(toolbarView) {
    app.mainView.showToolbar(toolbarView);
  },
});
