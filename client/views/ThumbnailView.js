/**
 * Single thumbnail view
 */
import AmpersandView from 'ampersand-view';

import template from '../templates/views/thumbnailView.jade';

export default AmpersandView.extend({
  autoRender: true,
  template,

  bindings: {
    'model.url': {
      selector: '.b-thumbnail__image',
      type: 'attribute',
      name: 'src',
    },
  },
});
