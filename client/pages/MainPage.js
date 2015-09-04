/**
 * Main application page that includes manages subpages and regions
 */

import AmpersandView from 'ampersand-view';
import ViewSwitcher from 'ampersand-view-switcher';
import {invoke,flatten} from 'lodash';

import {openThumbnails} from '../actions/navigationActions.js';
import ThumbnailsPage from '../pages/ThumbnailsPage.js';
import PhotosPage from '../pages/PhotoPage.js';
import mainPageTemplate from '../templates/mainPage.jade';
import app from 'ampersand-app';

const THUMBNAILS_MODE = 'THUMBNAILS';
const PHOTO_MODE = 'PHOTO';

export default AmpersandView.extend({
  template: mainPageTemplate,

  props: {
    viewMode: ['string'],
  },

  events: {
    'click .b-navigation_thumbnails-button': 'onThumbnailsClick',
  },

  initialize() {
    this.unsubscribeStore = app.store.subscribe(() => this.handleChanges(app.store.getState()));
    this.on('change:viewMode', this.changeViewMode);
  },

  handleChanges(state) {
    this.viewMode = state.viewMode || THUMBNAILS_MODE;
  },

  changeViewMode(view, viewMode) {
    switch (viewMode) {
      case THUMBNAILS_MODE:
        this.showPage(new ThumbnailsPage());
        break;
      case PHOTO_MODE:
        this.showPage(new PhotosPage());
        break;

      default :
        this.showPage(new ThumbnailsPage());
    }
  },

  render() {
    this.renderWithTemplate();

    this.pageContainer = this.queryByHook('page-container');
    this.viewSwitcher = new ViewSwitcher(this.pageContainer);
  },

  showPage(view) {
    this.viewSwitcher.set(view);
  },

  onThumbnailsClick(evt) {
    evt.preventDefault();
    app.dispatchAction(openThumbnails());
  },
});
